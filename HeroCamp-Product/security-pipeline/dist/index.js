#!/usr/bin/env node
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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const orchestrator_1 = require("./orchestrator");
async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        console.log(`
🔒 Pipeline de Auditoría de Seguridad

Uso:
  audit-security --repo <ruta-repositorio> [opciones]

Ejemplos:
  audit-security --repo ./mi-proyecto
  audit-security --repo ./mi-proyecto --skill credentials
  audit-security --repo ./mi-proyecto --skill database

Opciones:
  --repo <ruta>     Ruta al repositorio a auditar (requerido)
  --skill <nombre>  Ejecutar solo una skill: credentials, database, data-privacy, configuration
  --output <ruta>   Ruta donde guardar el informe (default: security-report.md)
  --json            Salida en formato JSON
  --help, -h        Mostrar esta ayuda
    `);
        process.exit(0);
    }
    const repoIndex = args.indexOf('--repo');
    const outputIndex = args.indexOf('--output');
    const skillIndex = args.indexOf('--skill');
    const jsonFlag = args.includes('--json');
    if (repoIndex === -1) {
        console.error('❌ Error: Debes especificar --repo <ruta>');
        process.exit(1);
    }
    const repoPath = args[repoIndex + 1];
    if (!repoPath) {
        console.error('❌ Error: Debes proporcionar una ruta después de --repo');
        process.exit(1);
    }
    const outputPath = outputIndex !== -1 ? args[outputIndex + 1] : 'security-report.md';
    const skillName = skillIndex !== -1 ? args[skillIndex + 1] : undefined;
    // Validar skill si se proporciona
    const validSkills = ['credentials', 'database', 'data-privacy', 'configuration'];
    if (skillName && !validSkills.includes(skillName)) {
        console.error(`❌ Error: Skill inválida. Usa: ${validSkills.join(', ')}`);
        process.exit(1);
    }
    // Validar que el repositorio existe
    if (!fs.existsSync(repoPath)) {
        console.error(`❌ Error: El repositorio no existe: ${repoPath}`);
        process.exit(1);
    }
    if (!fs.existsSync(path.join(repoPath, '.git'))) {
        console.error(`❌ Error: No parece un repositorio Git: ${repoPath}`);
        process.exit(1);
    }
    const skillText = skillName ? ` [${skillName}]` : '';
    console.log(`🔍 Iniciando auditoría de seguridad${skillText}...\n`);
    const startTime = Date.now();
    try {
        const report = await (0, orchestrator_1.runSecurityAudit)(repoPath, skillName);
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        if (jsonFlag) {
            // Salida JSON
            console.log(JSON.stringify(report, null, 2));
        }
        else {
            // Salida formateada
            const formattedReport = (0, orchestrator_1.formatReport)(report);
            console.log(formattedReport);
            // Guardar en archivo
            const fullOutputPath = path.join(repoPath, outputPath);
            fs.writeFileSync(fullOutputPath, formattedReport);
            console.log(`\n✅ Informe guardado en: ${fullOutputPath}`);
        }
        console.log(`\n⏱️  Auditoría completada en ${duration}s`);
        // Exit con código basado en recomendación
        if (report.recommendation === 'DO_NOT_DEPLOY') {
            process.exit(1);
        }
    }
    catch (error) {
        console.error('❌ Error durante la auditoría:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map