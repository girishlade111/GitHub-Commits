// Category Groups
export const CATEGORY_GROUPS = {
  BUSINESS: 'Business & Website Projects',
  SOFTWARE: 'Software Development',
  AI_DATA: 'AI & Data',
  DEVOPS: 'DevOps & Infrastructure',
  SECURITY: 'Security',
  KNOWLEDGE: 'Curated & Knowledge Repos',
  EMERGING: 'Emerging Tech',
  REPO_TYPES: 'Repository Types',
} as const;

export type CategoryGroup = typeof CATEGORY_GROUPS[keyof typeof CATEGORY_GROUPS];

// Categories by Group
export const CATEGORIES_BY_GROUP: Record<CategoryGroup, string[]> = {
  [CATEGORY_GROUPS.BUSINESS]: [
    'Ecommerce', 'Business Website', 'Blog Platform', 'Portfolio',
    'Education Platform', 'Newsletter System', 'Magazine CMS',
    'Social Media App', 'Booking System', 'SaaS Platform', 'Landing Page Project',
  ],
  [CATEGORY_GROUPS.SOFTWARE]: [
    'Web Development', 'Mobile Development', 'Full Stack Application',
    'Frontend Project', 'Backend API', 'Developer Tools', 'CLI Tools',
    'Framework Boilerplate', 'Libraries', 'Design Systems',
  ],
  [CATEGORY_GROUPS.AI_DATA]: [
    'AI Agents', 'Machine Learning', 'Deep Learning', 'Data Science',
    'Automation Systems', 'LLM Integrations', 'Prompt Engineering', 'Model Evaluation',
  ],
  [CATEGORY_GROUPS.DEVOPS]: [
    'DevOps', 'Infrastructure', 'Cloud Native', 'Docker Projects',
    'Kubernetes', 'CI/CD', 'Self Hosted', 'Monitoring Tools',
  ],
  [CATEGORY_GROUPS.SECURITY]: [
    'Cyber Security', 'Ethical Hacking', 'Security Research', 'Encryption Systems',
  ],
  [CATEGORY_GROUPS.KNOWLEDGE]: [
    'Awesome Lists', 'Cheat Sheets', 'Roadmaps', 'Public APIs',
    'Interview Preparation', 'Open Source Books', 'Project Based Learning', 'Curated Resources',
  ],
  [CATEGORY_GROUPS.EMERGING]: [
    'Web3', 'Blockchain', 'Embedded Systems', 'IoT',
    'Low Code Platforms', 'No Code Platforms', 'Comparison Repositories', 'Top 10 Collections',
  ],
  [CATEGORY_GROUPS.REPO_TYPES]: [
    'Local to Remote Migration', 'Mirror Repository', 'Archived Repository', 'Internal Tools',
  ],
};

// All valid categories flattened
export const VALID_CATEGORIES = Object.values(CATEGORIES_BY_GROUP).flat();

// Configuration
export const MAX_COMMITS = 1000;
export const COMMIT_WARNING_THRESHOLD = 100;

/**
 * Parse repository URL into owner and repo
 */
export function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  const trimmed = url.trim().replace(/\/$/, '').replace(/\.git$/, '');
  
  // Match: https://github.com/owner/repo
  const httpsMatch = trimmed.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
  if (httpsMatch) {
    return { owner: httpsMatch[1], repo: httpsMatch[2] };
  }
  
  // Match: owner/repo (short format)
  const shortMatch = trimmed.match(/^([^/]+)\/([^/]+)$/);
  if (shortMatch) {
    return { owner: shortMatch[1], repo: shortMatch[2] };
  }
  
  return null;
}

/**
 * Validate GitHub token format
 * BUG FIX 1: Use OR logic instead of AND
 */
export function validateToken(token?: string): { isValid: boolean; error?: string } {
  if (!token || !token.trim()) {
    return { isValid: false, error: 'Token is required' };
  }
  
  const trimmedToken = token.trim();
  const isValidPrefix = trimmedToken.startsWith('ghp_') || 
                        trimmedToken.startsWith('gho_') || 
                        trimmedToken.startsWith('ghu_') || 
                        trimmedToken.startsWith('ghs_') || 
                        trimmedToken.startsWith('ghr_') ||
                        trimmedToken.startsWith('github_pat_');
  const isValidLength = trimmedToken.length >= 20;
  
  // BUG FIX: Use OR logic - both checks must pass
  if (!isValidPrefix || !isValidLength) {
    return { 
      isValid: false, 
      error: 'Invalid token format. Must be a GitHub PAT starting with ghp_, gho_, ghu_, ghs_, ghr_, or github_pat_ and be at least 20 characters.' 
    };
  }
  
  return { isValid: true };
}

/**
 * Validate commit count
 */
export function validateCommitCount(count: unknown): { 
  isValid: boolean; 
  error?: string; 
  warning?: string 
} {
  if (typeof count !== 'number' || Number.isNaN(count)) {
    return { isValid: false, error: 'Commit count must be a number' };
  }
  
  if (!Number.isInteger(count)) {
    return { isValid: false, error: 'Commit count must be an integer' };
  }
  
  if (count < 1) {
    return { isValid: false, error: 'Commit count must be at least 1' };
  }
  
  if (count > MAX_COMMITS) {
    return { isValid: false, error: `Commit count cannot exceed ${MAX_COMMITS}` };
  }
  
  if (count > COMMIT_WARNING_THRESHOLD) {
    return { 
      isValid: true, 
      warning: `Large number of commits (${count}). This may take a while and could trigger GitHub rate limits.` 
    };
  }
  
  return { isValid: true };
}

/**
 * Validate category exists
 */
export function validateCategory(category: string): boolean {
  return VALID_CATEGORIES.includes(category);
}

/**
 * Check if user has write access to repository
 * BUG FIX 3: This function must be called in github.ts
 */
export function hasWriteAccess(
  repoOwner: string, 
  userLogin: string | null, 
  isPrivate: boolean, 
  hasToken: boolean
): boolean {
  if (!isPrivate && hasToken) {
    return true;
  }
  
  if (isPrivate && hasToken) {
    return repoOwner === userLogin;
  }
  
  return false;
}

/**
 * Validate complete request body
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateRequest(body: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!body || typeof body !== 'object') {
    errors.push('Request body must be a valid JSON object');
    return { isValid: false, errors, warnings };
  }
  
  const { repoUrl, token, commitCount, category } = body as Record<string, unknown>;
  
  const parsedRepo = parseRepoUrl(repoUrl as string);
  if (!parsedRepo) {
    errors.push('Invalid repository URL. Must be in format: https://github.com/owner/repo or owner/repo');
  }
  
  const tokenValidation = validateToken(token as string);
  if (!tokenValidation.isValid) {
    errors.push(tokenValidation.error || 'Invalid token');
  }
  
  const countValidation = validateCommitCount(commitCount);
  if (!countValidation.isValid) {
    errors.push(countValidation.error || 'Invalid commit count');
  } else if (countValidation.warning) {
    warnings.push(countValidation.warning);
  }
  
  if (!validateCategory(category as string)) {
    errors.push('Invalid category. Must be one of the valid categories.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
