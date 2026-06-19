"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSecurityAudit = runSecurityAudit;
exports.formatReport = formatReport;
const skill_credentials_1 = require("./skills/skill-credentials");
const skill_database_1 = require("./skills/skill-database");
const skill_data_privacy_1 = require("./skills/skill-data-privacy");
const skill_configuration_1 = require("./skills/skill-configuration");
async function runSecurityAudit(repoPath, specificSkill) {
    const startTime = Date.now();
    // Ejecutar skills
    let skillResults;
    if (specificSkill) {
        // Ejecutar solo la skill solicitada
        let singleResult;
        switch (specificSkill) {
            case 'credentials':
                singleResult = await (0, skill_credentials_1.auditCredentials)(repoPath);
                break;
            case 'database':
                singleResult = await (0, skill_database_1.auditDatabase)(repoPath);
                break;
            case 'data-privacy':
                singleResult = await (0, skill_data_privacy_1.auditDataPrivacy)(repoPath);
                break;
            case 'configuration':
                singleResult = await (0, skill_configuration_1.auditConfiguration)(repoPath);
                break;
            default:
                throw new Error(`Skill desconocida: ${specificSkill}`);
        }
        skillResults = [singleResult];
    }
    else {
        // Ejecutar todas las skills en paralelo
        skillResults = await Promise.all([
            (0, skill_credentials_1.auditCredentials)(repoPath),
            (0, skill_database_1.auditDatabase)(repoPath),
            (0, skill_data_privacy_1.auditDataPrivacy)(repoPath),
            (0, skill_configuration_1.auditConfiguration)(repoPath)
        ]);
    }
    // Consolidar todos los hallazgos
    const allFindings = skillResults
        .flatMap(result => result.findings)
        .sort((a, b) => {
        const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2 };
        if (severityOrder[a.severity] !== severityOrder[b.severity]) {
            return severityOrder[a.severity] - severityOrder[b.severity];
        }
        return a.family - b.family;
    });
    // Calcular estadísticas
    const criticalCount = allFindings.filter(f => f.severity === 'CRITICAL').length;
    const highCount = allFindings.filter(f => f.severity === 'HIGH').length;
    const mediumCount = allFindings.filter(f => f.severity === 'MEDIUM').length;
    // Determinar recomendación
    let recommendation;
    if (criticalCount > 0) {
        recommendation = 'DO_NOT_DEPLOY';
    }
    else if (highCount > 0) {
        recommendation = 'REVIEW_BEFORE_DEPLOY';
    }
    else {
        recommendation = 'SAFE_TO_DEPLOY';
    }
    return {
        repository: repoPath,
        date: new Date().toISOString(),
        findings: allFindings,
        summary: {
            totalChecks: skillResults.length,
            criticalCount,
            highCount,
            mediumCount
        },
        recommendation
    };
}
function formatReport(report) {
    const lines = [];
    lines.push('# 🔒 Informe de Seguridad');
    lines.push('');
    lines.push(`**Repositorio**: ${report.repository}`);
    lines.push(`**Fecha**: ${new Date(report.date).toLocaleString('es-ES')}`);
    lines.push(`**Ejecutado por**: Pipeline de Seguridad v1.0`);
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push('## Resumen Ejecutivo');
    lines.push('');
    if (report.summary.criticalCount > 0) {
        lines.push(`❌ **${report.summary.criticalCount} hallazgos CRÍTICOS**`);
    }
    if (report.summary.highCount > 0) {
        lines.push(`⚠️  **${report.summary.highCount} hallazgos ALTOS**`);
    }
    if (report.summary.mediumCount > 0) {
        lines.push(`🔶 **${report.summary.mediumCount} hallazgos MEDIOS**`);
    }
    if (report.findings.length === 0) {
        lines.push('✅ **Ningún hallazgo de seguridad detectado**');
    }
    lines.push('');
    lines.push(`**Recomendación**: ${getRecommendationEmoji(report.recommendation)} **${getRecommendationText(report.recommendation)}**`);
    lines.push('');
    lines.push('---');
    lines.push('');
    if (report.findings.length > 0) {
        lines.push('## Hallazgos Detallados');
        lines.push('');
        const byFamily = groupByFamily(report.findings);
        for (const family of [1, 2, 3, 4]) {
            const familyFindings = byFamily[family] || [];
            if (familyFindings.length === 0)
                continue;
            const familyName = getFamilyName(family);
            const familyEmoji = getFamilyEmoji(family);
            lines.push(`### ${familyEmoji} Familia ${family} · ${familyName}`);
            lines.push('');
            for (const finding of familyFindings) {
                const emoji = finding.severity === 'CRITICAL' ? '❌' : finding.severity === 'HIGH' ? '⚠️ ' : '🔶';
                lines.push(`${emoji} **[${finding.severity}]** ${finding.title}`);
                lines.push(`- **Ubicación**: ${finding.location}`);
                lines.push(`- **Por qué importa**: ${finding.why}`);
                lines.push(`- **Qué hacer**: ${finding.action}`);
                lines.push('');
            }
        }
    }
    lines.push('---');
    lines.push('');
    lines.push('## Próximos Pasos Recomendados');
    lines.push('');
    const criticalFindings = report.findings.filter(f => f.severity === 'CRITICAL');
    if (criticalFindings.length > 0) {
        lines.push('1. **Inmediatamente**: Resuelve todos los hallazgos CRÍTICOS');
        for (let i = 0; i < Math.min(3, criticalFindings.length); i++) {
            lines.push(`   - ${criticalFindings[i].title}`);
        }
        lines.push('');
    }
    const highFindings = report.findings.filter(f => f.severity === 'HIGH');
    if (highFindings.length > 0) {
        lines.push('2. **Esta semana**: Resuelve los hallazgos ALTOS');
        for (let i = 0; i < Math.min(2, highFindings.length); i++) {
            lines.push(`   - ${highFindings[i].title}`);
        }
        lines.push('');
    }
    lines.push('3. **Antes de desplegar**: Ejecuta nuevamente este pipeline');
    lines.push('');
    return lines.join('\n');
}
function groupByFamily(findings) {
    const groups = {};
    for (const finding of findings) {
        if (!groups[finding.family]) {
            groups[finding.family] = [];
        }
        groups[finding.family].push(finding);
    }
    return groups;
}
function getFamilyName(family) {
    const names = {
        1: 'Credenciales y Secretos',
        2: 'Bases de Datos y Permisos',
        3: 'Datos Sensibles y Privacidad',
        4: 'Entornos y Configuración'
    };
    return names[family] || 'Desconocida';
}
function getFamilyEmoji(family) {
    const emojis = {
        1: '🔑',
        2: '🗄️ ',
        3: '👤',
        4: '⚙️ '
    };
    return emojis[family] || '❓';
}
function getRecommendationText(recommendation) {
    const texts = {
        'SAFE_TO_DEPLOY': 'DESPLIEGUE SEGURO',
        'REVIEW_BEFORE_DEPLOY': 'REVISAR ANTES DE DESPLEGAR',
        'DO_NOT_DEPLOY': 'NO DESPLEGAR HASTA RESOLVER'
    };
    return texts[recommendation] || recommendation;
}
function getRecommendationEmoji(recommendation) {
    const emojis = {
        'SAFE_TO_DEPLOY': '✅',
        'REVIEW_BEFORE_DEPLOY': '⚠️ ',
        'DO_NOT_DEPLOY': '❌'
    };
    return emojis[recommendation] || '❓';
}
//# sourceMappingURL=orchestrator.js.map