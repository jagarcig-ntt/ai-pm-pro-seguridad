export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM';
export type Family = 1 | 2 | 3 | 4;

export interface Finding {
  severity: Severity;
  family: Family;
  title: string;
  location: string;
  why: string;
  action: string;
}

export interface SkillResult {
  skillName: string;
  findings: Finding[];
  executionTimeMs: number;
  error?: string;
}

export interface SecurityReport {
  repository: string;
  date: string;
  findings: Finding[];
  summary: {
    totalChecks: number;
    criticalCount: number;
    highCount: number;
    mediumCount: number;
  };
  recommendation: 'SAFE_TO_DEPLOY' | 'REVIEW_BEFORE_DEPLOY' | 'DO_NOT_DEPLOY';
}
