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
exports.auditConfiguration = auditConfiguration;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function auditConfiguration(repoPath) {
    const startTime = Date.now();
    const findings = [];
    try {
        // 1. Detectar CORS inseguro
        const corsFindings = detectCorsIssues(repoPath);
        findings.push(...corsFindings);
        // 2. Detectar endpoints sin autenticación
        const endpointFindings = detectUnprotectedEndpoints(repoPath);
        findings.push(...endpointFindings);
        // 3. Detectar variables de entorno peligrosas
        const envFindings = detectDangerousDefaults(repoPath);
        findings.push(...envFindings);
        // 4. Detectar headers de seguridad ausentes
        const headerFindings = detectMissingSecurityHeaders(repoPath);
        findings.push(...headerFindings);
    }
    catch (error) {
        return {
            skillName: 'skill-configuration',
            findings: [],
            executionTimeMs: Date.now() - startTime,
            error: `Error durante auditoría de configuración: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
    return {
        skillName: 'skill-configuration',
        findings,
        executionTimeMs: Date.now() - startTime
    };
}
function detectCorsIssues(repoPath) {
    const findings = [];
    const sourceFiles = findSourceFiles(repoPath, ['.js', '.ts', '.jsx', '.tsx']);
    for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        // Detectar cors({ origin: '*' })
        const corsMatches = Array.from(content.matchAll(/cors\s*\(\s*{\s*origin\s*:\s*['"`]\*['"`]\s*}\s*\)/gi));
        for (const match of corsMatches) {
            const line = content.substring(0, match.index || 0).split('\n').length;
            findings.push({
                severity: 'HIGH',
                family: 4,
                title: 'CORS configurado con origen wildcard (*)',
                location: `${relPath}:${line}`,
                why: `CORS está configurado para aceptar peticiones desde CUALQUIER origen. Esto permite que cualquier sitio web del mundo haga peticiones a tu API. Combinado con credenciales en el cliente, esto es crítico.`,
                action: `Cambia 'cors({ origin: \'*\' })' a una lista blanca: cors({ origin: ['https://tundominio.com', 'https://app.tundominio.com'] })`
            });
        }
        // Detectar Access-Control-Allow-Origin: *
        const acaoMatches = Array.from(content.matchAll(/Access-Control-Allow-Origin['"]?\s*[:=]\s*['"`]\*['"`]/gi));
        for (const match of acaoMatches) {
            const line = content.substring(0, match.index || 0).split('\n').length;
            findings.push({
                severity: 'HIGH',
                family: 4,
                title: 'Header Access-Control-Allow-Origin con wildcard (*)',
                location: `${relPath}:${line}`,
                why: 'El header CORS está configurado con wildcard. Esto permite CSRF (Cross-Site Request Forgery) si el sitio contiene datos sensibles.',
                action: `Reemplaza '*' con los orígenes específicos permitidos: 'https://tundominio.com'`
            });
        }
    }
    return findings;
}
function detectUnprotectedEndpoints(repoPath) {
    const findings = [];
    const sourceFiles = findSourceFiles(repoPath, ['.js', '.ts', '.jsx', '.tsx']);
    const dangerousEndpoints = [
        '/admin',
        '/api/admin',
        '/_admin',
        '/api/superuser',
        '/debug',
        '/_debug',
        '/api/debug'
    ];
    for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        for (const endpoint of dangerousEndpoints) {
            // Buscar definición de endpoint sin autenticación
            const endpointPattern = new RegExp(`(?:app\\.|router\\.)(get|post|put|delete|patch)\\s*\\(['\`]${endpoint}['\`](?!.*authenticate|.*auth|.*verify|.*require|.*permission)`, 'gi');
            const matches = Array.from(content.matchAll(endpointPattern));
            for (const match of matches) {
                const line = content.substring(0, match.index || 0).split('\n').length;
                // Verificar si hay middleware de autenticación cerca
                const afterEndpoint = content.substring(match.index || 0, (match.index || 0) + 300);
                const hasAuth = /authenticate|auth|verify|permission|authMiddleware|requireAuth/i.test(afterEndpoint);
                if (!hasAuth) {
                    findings.push({
                        severity: 'CRITICAL',
                        family: 4,
                        title: `Endpoint '${endpoint}' sin autenticación`,
                        location: `${relPath}:${line}`,
                        why: `El endpoint '${endpoint}' está expuesto sin verificar si el usuario está autenticado. Cualquiera puede acceder a él directamente desde el navegador o con curl.`,
                        action: `Añade autenticación: app.get('${endpoint}', authenticate, (req, res) => { ... }). El middleware 'authenticate' debe verificar credenciales válidas.`
                    });
                }
            }
        }
    }
    return findings;
}
function detectDangerousDefaults(repoPath) {
    const findings = [];
    const sourceFiles = findSourceFiles(repoPath, ['.js', '.ts', '.jsx', '.tsx']);
    for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        // Detectar DEFAULT valores inseguros: process.env.X || unsafeDefault
        const dangerousDefaults = [
            { pattern: /process\.env\.DEBUG\s*\|\|\s*(true|1|'true'|"true")/gi, name: 'DEBUG', danger: 'true' },
            { pattern: /process\.env\.CORS_ORIGIN\s*\|\|\s*['"`]\*['"`]/gi, name: 'CORS_ORIGIN', danger: "'*'" },
            { pattern: /process\.env\.NODE_ENV\s*\|\|\s*['"`]development['"`]/gi, name: 'NODE_ENV', danger: "'development'" }
        ];
        for (const { pattern, name, danger } of dangerousDefaults) {
            const matches = Array.from(content.matchAll(pattern));
            for (const match of matches) {
                const line = content.substring(0, match.index || 0).split('\n').length;
                findings.push({
                    severity: 'MEDIUM',
                    family: 4,
                    title: `Variable de entorno '${name}' con default inseguro`,
                    location: `${relPath}:${line}`,
                    why: `Si la variable de entorno '${name}' no está definida en producción, el código usa ${danger} como valor por defecto. En producción, el valor por defecto debería ser el MÁS SEGURO, no el más permisivo.`,
                    action: `Invierte la lógica: en producción, si falta la variable, FALLA ruidosamente (throw error). Solo en desarrollo usa defaults permisivos.`
                });
            }
        }
    }
    return findings;
}
function detectMissingSecurityHeaders(repoPath) {
    const findings = [];
    const sourceFiles = findSourceFiles(repoPath, ['.js', '.ts', '.jsx', '.tsx']);
    let hasSecurityHeaders = false;
    let hasHelmet = false;
    for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Detectar si usa Helmet o similares
        if (/helmet|csp|hsts|x-frame-options/i.test(content)) {
            hasSecurityHeaders = true;
            hasHelmet = true;
            break;
        }
        // Detectar si configura headers manualmente
        if (/Content-Security-Policy|Strict-Transport-Security|X-Frame-Options/i.test(content)) {
            hasSecurityHeaders = true;
        }
    }
    if (!hasSecurityHeaders) {
        findings.push({
            severity: 'MEDIUM',
            family: 4,
            title: 'Headers de seguridad HTTP no detectados',
            location: 'Configuración general de la aplicación',
            why: 'La aplicación no parece tener headers de seguridad como CSP, HSTS, X-Frame-Options. Estos protegen contra ataques comunes como clickjacking, inyección de scripts, etc.',
            action: `Instala Helmet (npm install helmet) y úsalo: const helmet = require('helmet'); app.use(helmet());. O configura los headers manualmente.`
        });
    }
    return findings;
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