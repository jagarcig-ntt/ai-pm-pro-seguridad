import { Finding, SkillResult } from '../../types';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface CredentialPattern {
  name: string;
  regex: RegExp;
  provider: string;
}

const CREDENTIAL_PATTERNS: CredentialPattern[] = [
  { name: 'Google API Key', regex: /AIzaSy[A-Za-z0-9_-]{20,40}/g, provider: 'Google' },
  { name: 'OpenAI API Key', regex: /sk-[A-Za-z0-9]{20,}/g, provider: 'OpenAI' },
  { name: 'GitHub PAT', regex: /ghp_[A-Za-z0-9]{20,}/g, provider: 'GitHub' },
  { name: 'Slack Token', regex: /xoxb-[0-9A-Za-z-]{20,}/g, provider: 'Slack' },
  { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/g, provider: 'AWS' },
  { name: 'SendGrid API Key', regex: /SG\.[A-Za-z0-9_-]{20,}/g, provider: 'SendGrid' },
  { name: 'Anthropic API Key', regex: /sk-ant-[A-Za-z0-9]{20,}/g, provider: 'Anthropic' },
];

const DATABASE_URL_PATTERN = /(?:postgresql|mysql|mongodb)\+?(?:srv)?:\/\/[^:]+:[^@]+@[^\s"'`]+/gi;

export async function auditCredentials(repoPath: string): Promise<SkillResult> {
  const startTime = Date.now();
  const findings: Finding[] = [];

  try {
    // 1. Buscar credenciales en archivos de código
    const credentialsInCode = searchCredentialsInCode(repoPath);
    findings.push(...credentialsInCode);

    // 2. Verificar archivo .env
    const envFindings = checkEnvFile(repoPath);
    findings.push(...envFindings);

    // 3. Buscar en historial de Git
    const gitFindings = searchCredentialsInGitHistory(repoPath);
    findings.push(...gitFindings);

  } catch (error) {
    return {
      skillName: 'skill-credentials',
      findings: [],
      executionTimeMs: Date.now() - startTime,
      error: `Error durante auditoría de credenciales: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }

  return {
    skillName: 'skill-credentials',
    findings,
    executionTimeMs: Date.now() - startTime
  };
}

function searchCredentialsInCode(repoPath: string): Finding[] {
  const findings: Finding[] = [];
  const sourceFiles = findSourceFiles(repoPath);

  for (const filePath of sourceFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relPath = path.relative(repoPath, filePath);

    for (const pattern of CREDENTIAL_PATTERNS) {
      const matches = content.matchAll(pattern.regex);
      for (const match of matches) {
        const line = content.substring(0, match.index || 0).split('\n').length;
        findings.push({
          severity: 'CRITICAL',
          family: 1,
          title: `${pattern.name} hardcodeada`,
          location: `${relPath}:${line}`,
          why: `La clave de ${pattern.provider} está visible en el código fuente. Cualquiera con acceso al repositorio puede usarla para explotar tus servicios.`,
          action: `Remueve la clave de ${relPath} y configúrala como variable de entorno en producción. Rota la clave inmediatamente en ${pattern.provider}.`
        });
      }
    }

    // Buscar DATABASE_URL con credenciales
    const dbMatches = content.matchAll(DATABASE_URL_PATTERN);
    for (const match of dbMatches) {
      const line = content.substring(0, match.index || 0).split('\n').length;
      findings.push({
        severity: 'HIGH',
        family: 1,
        title: 'Cadena de conexión a base de datos con credenciales embebidas',
        location: `${relPath}:${line}`,
        why: 'La contraseña de la base de datos está en el código fuente. Si alguien accede al repositorio, puede acceder a todos tus datos.',
        action: 'Mueve la DATABASE_URL a variables de entorno. Rota las credenciales de la base de datos inmediatamente.'
      });
    }
  }

  return findings;
}

function checkEnvFile(repoPath: string): Finding[] {
  const findings: Finding[] = [];
  const envPath = path.join(repoPath, '.env');
  const gitignorePath = path.join(repoPath, '.gitignore');

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');

    // Verificar si .env está en .gitignore
    const gitignoreContent = fs.existsSync(gitignorePath)
      ? fs.readFileSync(gitignorePath, 'utf-8')
      : '';

    const envInGitignore = gitignoreContent.includes('.env');

    findings.push({
      severity: 'HIGH',
      family: 1,
      title: 'Archivo .env presente en el repositorio',
      location: '.env',
      why: `El archivo .env está siendo tracked por Git${envInGitignore ? ' pero está en .gitignore' : ' y NO está en .gitignore'}. Las variables de entorno contienen credenciales sensibles.`,
      action: `${!envInGitignore ? 'Añade .env a .gitignore. ' : ''}Remueve .env del historial de Git con: git rm --cached .env && git commit -m "Remove .env from tracking"`
    });

    // Detectar credenciales dentro del .env
    for (const pattern of CREDENTIAL_PATTERNS) {
      if (pattern.regex.test(envContent)) {
        findings.push({
          severity: 'CRITICAL',
          family: 1,
          title: `${pattern.name} en archivo .env commiteado`,
          location: '.env',
          why: `El .env contiene una clave de ${pattern.provider} y está en el repositorio. Esta es una exposición crítica.`,
          action: `Elimina el archivo .env del repositorio, rota la clave en ${pattern.provider} inmediatamente.`
        });
      }
    }
  }

  return findings;
}

function searchCredentialsInGitHistory(repoPath: string): Finding[] {
  const findings: Finding[] = [];

  try {
    // Obtener últimos 50 commits
    const commits = execSync(`cd "${repoPath}" && git log -50 --pretty=format:%H`, {
      encoding: 'utf-8'
    }).split('\n').filter(c => c);

    for (const commit of commits) {
      try {
        const diff = execSync(`cd "${repoPath}" && git show ${commit}`, {
          encoding: 'utf-8',
          maxBuffer: 10 * 1024 * 1024
        });

        for (const pattern of CREDENTIAL_PATTERNS) {
          if (pattern.regex.test(diff)) {
            findings.push({
              severity: 'CRITICAL',
              family: 1,
              title: `${pattern.name} encontrada en historial de Git`,
              location: `Commit ${commit.substring(0, 7)}`,
              why: `Una clave de ${pattern.provider} fue commiteada en algún momento. Incluso si se removió después, está en el historial de Git.`,
              action: `Esta clave está comprometida. Rota inmediatamente en ${pattern.provider}. Para limpiar el historial, usa: git filter-branch --tree-filter 'git rm -rf .env' HEAD`
            });
            break;
          }
        }
      } catch {
        // Ignorar errores en commits individuales
      }
    }
  } catch {
    // Git no disponible, continuar sin historial
  }

  return findings;
}

function findSourceFiles(repoPath: string): string[] {
  const extensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.json', '.env', '.config'];
  const files: string[] = [];

  function walkDir(dir: string) {
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.startsWith('.')) continue;
        if (entry === 'node_modules' || entry === '.git' || entry === 'dist') continue;

        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          walkDir(fullPath);
        } else if (extensions.some(ext => entry.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch {
      // Ignorar errores de lectura
    }
  }

  walkDir(repoPath);
  return files;
}
