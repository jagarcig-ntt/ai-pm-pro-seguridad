"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditDatabase = auditDatabase;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function auditDatabase(repoPath) {
    const startTime = Date.now();
    const findings = [];
    try {
        // 1. Detectar service_role key en cliente
        const serviceRoleFindings = detectServiceRoleInClient(repoPath);
        findings.push(...serviceRoleFindings);
        // 2. Buscar tablas sin RLS en SQL
        const rslsFindings = detectTablesWithoutRLS(repoPath);
        findings.push(...rslsFindings);
        // 3. Extraer credenciales y hacer verificación activa
        const credentials = extractSupabaseCredentials(repoPath);
        if (credentials) {
            const activeCheckFindings = await verifyTablesWithAnonymousKey(repoPath, credentials);
            findings.push(...activeCheckFindings);
        }
        // 4. Detectar políticas RLS cosmética
        const cosmicRlsFindings = detectCosmeticRLS(repoPath);
        findings.push(...cosmicRlsFindings);
    }
    catch (error) {
        return {
            skillName: 'skill-database',
            findings: [],
            executionTimeMs: Date.now() - startTime,
            error: `Error durante auditoría de base de datos: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
    return {
        skillName: 'skill-database',
        findings,
        executionTimeMs: Date.now() - startTime
    };
}
function detectServiceRoleInClient(repoPath) {
    const findings = [];
    const sourceFiles = findSourceFiles(repoPath, ['.js', '.ts', '.jsx', '.tsx']);
    for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        // Detectar service_role key
        const serviceRoleMatches = Array.from(content.matchAll(/service_role[_\s]*key[:\s]*["']?([A-Za-z0-9_.\\-]{20,})/gi));
        for (const match of serviceRoleMatches) {
            const line = content.substring(0, match.index || 0).split('\n').length;
            // Verificar que no sea en un servidor Node (backend)
            const isLikelyClient = filePath.includes('src/') &&
                !filePath.includes('server') &&
                !filePath.includes('backend') &&
                !filePath.includes('api/') &&
                (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.tsx'));
            if (isLikelyClient) {
                findings.push({
                    severity: 'CRITICAL',
                    family: 2,
                    title: 'Service role key en código de cliente',
                    location: `${relPath}:${line}`,
                    why: 'La service_role key de Supabase salta todas las políticas de RLS. Si aparece en el cliente (JavaScript), cualquiera puede usarla para acceder a TODOS los datos sin restricciones.',
                    action: `Remueve la service_role key de ${relPath}. Usa la anon key en el cliente (es la correcta por diseño). Si necesitas operaciones administrativas, implementalas en un servidor backend con la service_role protegida.`
                });
            }
        }
        // Detectar si está en archivos de configuración claramente de cliente
        if (filePath.includes('admin.js') ||
            filePath.includes('admin.ts') ||
            filePath.includes('app.js')) {
            if (/service_role|service role/i.test(content)) {
                findings.push({
                    severity: 'CRITICAL',
                    family: 2,
                    title: 'Service role key detectada en archivo de cliente',
                    location: relPath,
                    why: 'Este archivo se ejecuta en el navegador. La service_role key está expuesta a cualquiera que inspeccione el código del navegador.',
                    action: `Remueve completamente la service_role key de ${relPath}. Reconfigura para usar la anon key + RLS correctamente configurado en Supabase.`
                });
            }
        }
    }
    return findings;
}
function detectTablesWithoutRLS(repoPath) {
    const findings = [];
    // Buscar archivos SQL
    const sqlFiles = findSourceFiles(repoPath, ['.sql']);
    for (const filePath of sqlFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        // Buscar CREATE TABLE statements
        const tableMatches = Array.from(content.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gi));
        // Recopilar todas las tablas que tienen RLS habilitado (solo líneas activas, no comentadas)
        const tablesWithRLS = new Set();
        const lines = content.split('\n');
        for (const line of lines) {
            // Ignorar líneas comentadas
            if (line.trim().startsWith('--'))
                continue;
            const rlsMatch = line.match(/ALTER\s+TABLE\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY/i);
            if (rlsMatch) {
                tablesWithRLS.add(rlsMatch[1].toLowerCase());
            }
        }
        // Verificar cada tabla
        for (const match of tableMatches) {
            const tableName = match[1];
            const tableStart = match.index || 0;
            if (!tablesWithRLS.has(tableName.toLowerCase())) {
                const line = content.substring(0, tableStart).split('\n').length;
                // Buscar comentario pendiente cerca de la tabla
                const afterTable = content.substring(tableStart);
                const nextCreateTable = afterTable.indexOf('CREATE TABLE', 10);
                const beforeNextTable = nextCreateTable > 0 ? afterTable.substring(0, nextCreateTable) : afterTable;
                const hasPendingComment = /TODO|PENDING|se activará en producción|will be enabled/i.test(beforeNextTable.substring(0, 500));
                findings.push({
                    severity: 'CRITICAL',
                    family: 2,
                    title: `Tabla '${tableName}' sin Row Level Security (RLS)`,
                    location: `${relPath}:${line}`,
                    why: `La tabla '${tableName}' fue creada sin RLS. Esto significa que cualquiera con la clave anónima de Supabase puede leer TODOS los registros sin restricción.${hasPendingComment ? ' El comentario sugiere que se planeaba hacerlo "después", pero esto nunca ocurrió.' : ''}`,
                    action: `Añade RLS a la tabla: ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY; Luego define políticas específicas con CREATE POLICY para cada caso de uso.`
                });
            }
        }
    }
    return findings;
}
function detectCosmeticRLS(repoPath) {
    const findings = [];
    const sqlFiles = findSourceFiles(repoPath, ['.sql']);
    for (const filePath of sqlFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        // Detectar USING (true) que es seguridad cosmética
        const cosmeticMatches = Array.from(content.matchAll(/CREATE\s+POLICY\s+[a-zA-Z_][a-zA-Z0-9_]*\s+ON\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+.*?USING\s*\(\s*true\s*\)/gi));
        for (const match of cosmeticMatches) {
            const tableName = match[1];
            const line = content.substring(0, match.index || 0).split('\n').length;
            findings.push({
                severity: 'HIGH',
                family: 2,
                title: `Política RLS cosmética en tabla '${tableName}'`,
                location: `${relPath}:${line}`,
                why: `La política tiene USING (true), lo que significa "permite acceso a todos". Técnicamente RLS está activado pero no protege nada.`,
                action: `Reemplaza USING (true) con una condición real que filtre por usuario: USING (auth.uid() = user_id) o similar según tu caso de uso.`
            });
        }
    }
    return findings;
}
function extractSupabaseCredentials(repoPath) {
    const sourceFiles = findSourceFiles(repoPath, [
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.env'
    ]);
    for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Buscar SUPABASE_URL
        const urlMatch = content.match(/SUPABASE_URL\s*[:=]\s*["']?(https:\/\/[a-zA-Z0-9-]+\.supabase\.co)["']?/i);
        // Buscar SUPABASE_ANON_KEY
        const anonKeyMatch = content.match(/SUPABASE_ANON_KEY\s*[:=]\s*["']?([A-Za-z0-9_\-.]+)["']?/i);
        if (urlMatch && anonKeyMatch) {
            return {
                url: urlMatch[1],
                anonKey: anonKeyMatch[1]
            };
        }
    }
    return null;
}
async function verifyTablesWithAnonymousKey(repoPath, credentials) {
    const findings = [];
    // Buscar qué tablas se crean
    const sqlFiles = findSourceFiles(repoPath, ['.sql']);
    const tables = [];
    for (const filePath of sqlFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const tableMatches = Array.from(content.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gi));
        for (const match of tableMatches) {
            tables.push(match[1]);
        }
    }
    // Intentar acceder a cada tabla con la anon key
    for (const tableName of tables) {
        try {
            const response = await fetchWithTimeout(`${credentials.url}/rest/v1/${tableName}?select=*&limit=1`, {
                headers: {
                    apikey: credentials.anonKey,
                    'Content-Type': 'application/json'
                },
                timeout: 3000
            });
            if (response.ok) {
                const data = await response.json();
                // Si devuelve un array, la tabla está accesible
                if (Array.isArray(data)) {
                    findings.push({
                        severity: 'CRITICAL',
                        family: 2,
                        title: `Tabla '${tableName}' accesible sin autenticación`,
                        location: `${tableName} (verificación activa con curl)`,
                        why: `La tabla '${tableName}' responde con datos cuando se accede con la anon key, lo que significa que no tiene RLS correctamente configurado. Contiene ${data.length > 0 ? `al menos ${data.length} registros públicamente accesibles` : 'la estructura de datos expuesta'}.`,
                        action: `Ejecuta en Supabase: ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY; CREATE POLICY ... para proteger la tabla.`
                    });
                }
            }
        }
        catch {
            // Silenciosamente ignorar errores de conectividad
        }
    }
    return findings;
}
function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 5000);
    return fetch(url, {
        signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
}
function findSourceFiles(repoPath, extensions) {
    const files = [];
    function walkDir(dir) {
        try {
            const entries = fs.readdirSync(dir);
            for (const entry of entries) {
                if (entry.startsWith('.'))
                    continue;
                if (entry === 'node_modules' || entry === '.git' || entry === 'dist')
                    continue;
                const fullPath = path.join(dir, entry);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    walkDir(fullPath);
                }
                else if (extensions.some(ext => entry.endsWith(ext))) {
                    files.push(fullPath);
                }
            }
        }
        catch {
            // Ignorar errores
        }
    }
    walkDir(repoPath);
    return files;
}
//# sourceMappingURL=index.js.map