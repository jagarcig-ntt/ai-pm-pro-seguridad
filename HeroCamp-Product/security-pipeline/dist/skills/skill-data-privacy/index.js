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
exports.auditDataPrivacy = auditDataPrivacy;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const EMAIL_PATTERN = {
    name: 'Email real',
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    isRealData: (email) => {
        // Excluir placeholders y dominios de prueba
        const testDomains = ['example.com', 'test.com', 'localhost', 'placeholder', 'fake', 'dummy'];
        return !testDomains.some(domain => email.toLowerCase().includes(domain));
    }
};
const IP_PATTERN = {
    name: 'Dirección IP',
    regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    isRealData: (ip) => {
        // Excluir IPs privadas y de prueba
        const testIps = ['127.0.0.1', '0.0.0.0', 'localhost'];
        const isPrivate = ip.startsWith('192.168') || ip.startsWith('10.') || ip.startsWith('172.16');
        return !testIps.includes(ip) && !isPrivate;
    }
};
const PHONE_PATTERN = {
    name: 'Número de teléfono',
    regex: /(?:\+?34|0)?(?:\d{2,3}[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/g,
    isRealData: () => true // Asumir que es real si lo encontramos
};
const PASSWORD_PATTERN = {
    name: 'Contraseña en texto plano',
    regex: /(?:password|passwd|pwd|secret)\s*[:=]\s*["']([^"']+)["']/gi,
    isRealData: (pwd) => pwd.length > 3 && !/^(test|demo|example|123|pass)$/i.test(pwd)
};
async function auditDataPrivacy(repoPath) {
    const startTime = Date.now();
    const findings = [];
    try {
        // 1. Detectar logging de datos sensibles
        const loggingFindings = detectSensitiveLogging(repoPath);
        findings.push(...loggingFindings);
        // 2. Detectar PII en código y fixtures
        const piiFindings = detectPIIInFiles(repoPath);
        findings.push(...piiFindings);
        // 3. Detectar ausencia de política de privacidad
        const privacyFindings = checkPrivacyPolicy(repoPath);
        findings.push(...privacyFindings);
    }
    catch (error) {
        return {
            skillName: 'skill-data-privacy',
            findings: [],
            executionTimeMs: Date.now() - startTime,
            error: `Error durante auditoría de privacidad: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
    return {
        skillName: 'skill-data-privacy',
        findings,
        executionTimeMs: Date.now() - startTime
    };
}
function detectSensitiveLogging(repoPath) {
    const findings = [];
    const sourceFiles = findSourceFiles(repoPath, ['.js', '.ts', '.jsx', '.tsx']);
    const loggingPatterns = [
        { pattern: /console\.(log|error|warn|debug)\s*\([^)]*\b(user|req|request|userData|data|payload)\b[^)]*\)/gi, name: 'console.log' },
        { pattern: /logger\.(info|warn|error|debug)\s*\([^)]*\b(user|req|request|userData|data|payload)\b[^)]*\)/gi, name: 'logger' }
    ];
    for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        for (const { pattern, name } of loggingPatterns) {
            const matches = Array.from(content.matchAll(pattern));
            for (const match of matches) {
                const line = content.substring(0, match.index || 0).split('\n').length;
                findings.push({
                    severity: 'HIGH',
                    family: 3,
                    title: `Logging de datos sensibles con ${name}`,
                    location: `${relPath}:${line}`,
                    why: `El código imprime objetos completos de usuario (user, req, userData). Estos contienen información personal (email, ID, metadata de sesión) que se registra en los logs. Si los logs se exponen o se archivan, la privacidad se compromete.`,
                    action: `Remueve el ${name} de ${relPath}. Si necesitas debuggear, usa: console.log('Usuario ID:', user.id) en lugar de console.log('Usuario:', user)`
                });
            }
        }
    }
    return findings;
}
function detectPIIInFiles(repoPath) {
    const findings = [];
    const allFiles = findSourceFiles(repoPath, [
        '.js',
        '.ts',
        '.json',
        '.jsx',
        '.tsx',
        '.csv'
    ]);
    // Enfatizar en archivos de fixtures/test
    const testFiles = allFiles.filter(f => f.includes('test') ||
        f.includes('fixture') ||
        f.includes('mock') ||
        f.includes('data'));
    for (const filePath of testFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relPath = path.relative(repoPath, filePath);
        // Buscar emails reales
        const emailMatches = Array.from(content.matchAll(EMAIL_PATTERN.regex));
        for (const match of emailMatches) {
            if (EMAIL_PATTERN.isRealData(match[0])) {
                const line = content.substring(0, match.index || 0).split('\n').length;
                findings.push({
                    severity: 'CRITICAL',
                    family: 3,
                    title: `Email real encontrado en datos de prueba`,
                    location: `${relPath}:${line}`,
                    why: `El email '${match[0]}' en el archivo de datos de prueba parece ser un email real. Si alguien accede a este archivo (en repositorio, backups, etc.), tendrá una lista de emails verdaderos.`,
                    action: `Reemplaza ${match[0]} con un email de prueba como test${Math.random().toString().slice(2, 5)}@example.com`
                });
            }
        }
        // Buscar IPs reales
        const ipMatches = Array.from(content.matchAll(IP_PATTERN.regex));
        for (const match of ipMatches) {
            if (IP_PATTERN.isRealData(match[0])) {
                const line = content.substring(0, match.index || 0).split('\n').length;
                findings.push({
                    severity: 'CRITICAL',
                    family: 3,
                    title: `Dirección IP real encontrada en datos de prueba`,
                    location: `${relPath}:${line}`,
                    why: `La IP '${match[0]}' parece ser una IP pública real. Esto puede revelar localización de usuarios reales si los datos se exponen.`,
                    action: `Reemplaza ${match[0]} con una IP de prueba como 203.0.113.1 (ejemplo de la RFC 5737)`
                });
            }
        }
        // Buscar contraseñas en texto plano
        const passwordMatches = Array.from(content.matchAll(PASSWORD_PATTERN.regex));
        for (const match of passwordMatches) {
            const pwd = match[1];
            if (PASSWORD_PATTERN.isRealData(pwd)) {
                const line = content.substring(0, match.index || 0).split('\n').length;
                findings.push({
                    severity: 'CRITICAL',
                    family: 3,
                    title: `Contraseña en texto plano en datos de prueba`,
                    location: `${relPath}:${line}`,
                    why: `Se encontró una contraseña '${pwd}' en texto plano en el archivo. Aunque sea para pruebas, esto es un riesgo si el archivo se expone o se guarda en backups.`,
                    action: `Reemplaza la contraseña por un valor de prueba como 'Test1234' y docúmenta claramente que es solo para testing.`
                });
            }
        }
    }
    return findings;
}
function checkPrivacyPolicy(repoPath) {
    const findings = [];
    // Buscar archivos de política de privacidad
    const policyFiles = ['PRIVACY.md', 'privacy.md', 'PRIVACY.txt', 'terms.md', 'TERMS.md'];
    const hasPolicy = policyFiles.some(file => fs.existsSync(path.join(repoPath, file)));
    if (!hasPolicy) {
        findings.push({
            severity: 'MEDIUM',
            family: 3,
            title: 'No se encontró política de privacidad',
            location: 'Raíz del repositorio',
            why: 'El proyecto no tiene un documento de política de privacidad accesible. Bajo RGPD y otras normativas, esto es obligatorio cuando el sitio trata datos personales. Los usuarios tienen derecho a saber cómo se usan sus datos.',
            action: 'Crea un archivo PRIVACY.md o privacy.md en la raíz del proyecto con tu política de privacidad. Mínimo: qué datos recopilas, para qué, cuánto tiempo los guardas, derechos del usuario.'
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