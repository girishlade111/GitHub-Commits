import { Octokit } from 'octokit';
import { hasWriteAccess } from './validation';

// Constants
const EDUCATION_FILE = 'edu-commit-log.txt';
const COMMIT_DELAY_MS = 400;

// Interfaces
export interface CommitResult {
  sha: string;
  message: string;
  timestamp: string;
  branch: string;
  url: string;
}

export interface GitHubError {
  status: number;
  message: string;
}

interface RepositoryInfo {
  isValid: boolean;
  isArchived: boolean;
  isPrivate: boolean;
  defaultBranch: string;
  isProtected: boolean;
  ownerLogin: string | null;
  permissions: string;
}

interface FileContent {
  sha: string | null;
  content: string;
}

// Import templates - using dynamic import to avoid issues
async function getTemplates() {
  const templates = await import('../utils/templates');
  return {
    getCommitMessages: templates.getCommitMessages,
    generateInitialContent: templates.generateInitialContent,
    generateFileContent: templates.generateFileContent,
  };
}

/**
 * Create Octokit instance with token
 */
export function createOctokit(token?: string): Octokit {
  return new Octokit({ 
    auth: token,
    userAgent: 'Git-Commit-Tool/2.0.0'
  });
}

/**
 * Validate repository accessibility and status
 */
export async function validateRepository(
  octokit: Octokit, 
  owner: string, 
  repo: string
): Promise<RepositoryInfo> {
  const { data: repository } = await octokit.rest.repos.get({ owner, repo });
  
  const isArchived = repository.archived ?? false;
  const isPrivate = repository.private ?? false;
  const defaultBranch = repository.default_branch ?? 'main';
  
  let isProtected = false;
  try {
    const { data: branch } = await octokit.rest.repos.getBranch({
      owner,
      repo,
      branch: defaultBranch,
    });
    isProtected = branch.protected ?? false;
  } catch {
    isProtected = false;
  }
  
  let ownerLogin: string | null = null;
  try {
    const { data: user } = await octokit.rest.users.getAuthenticated();
    ownerLogin = user.login;
  } catch {
    ownerLogin = owner;
  }
  
  const permissions = Object.entries(repository.permissions ?? {})
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'read';
  
  return {
    isValid: true,
    isArchived,
    isPrivate,
    defaultBranch,
    isProtected,
    ownerLogin,
    permissions,
  };
}

/**
 * Get current file content from repository
 */
export async function getCurrentFile(
  octokit: Octokit,
  owner: string,
  repo: string,
  branch: string
): Promise<FileContent> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: EDUCATION_FILE,
      ref: branch,
    });
    
    if (Array.isArray(data) || data.type !== 'file') {
      return { sha: null, content: '' };
    }
    
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return { sha: data.sha, content };
  } catch (error: unknown) {
    const err = error as { status?: number };
    if (err.status === 404) {
      return { sha: null, content: '' };
    }
    throw error;
  }
}

/**
 * Commit file to repository
 */
export async function commitFile(
  octokit: Octokit,
  owner: string,
  repo: string,
  branch: string,
  content: string,
  message: string,
  sha: string | null
): Promise<CommitResult> {
  const encodedContent = Buffer.from(content).toString('base64');
  
  const params: {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: string;
    branch: string;
    sha?: string;
  } = {
    owner,
    repo,
    path: EDUCATION_FILE,
    message,
    content: encodedContent,
    branch,
  };
  
  if (sha !== null) {
    params.sha = sha;
  }
  
  const response = await octokit.rest.repos.createOrUpdateFileContents(params as never);
  
  // The commit info is in response.data.commit
  const commitData = response.data.commit;
  
  return {
    sha: commitData?.sha ?? '',
    message: commitData?.message ?? message,
    timestamp: commitData?.committer?.date ?? new Date().toISOString(),
    branch,
    url: commitData?.html_url ?? '',
  };
}

/**
 * Generate educational commits to repository
 */
export async function generateEducationalCommits(
  token: string,
  owner: string,
  repo: string,
  commitCount: number,
  category: string,
  onProgress?: (current: number, total: number) => void
): Promise<CommitResult[]> {
  const octokit = createOctokit(token);
  
  const repoInfo = await validateRepository(octokit, owner, repo);
  
  if (repoInfo.isArchived) {
    throw { status: 403, message: 'Cannot commit to archived repositories' };
  }
  
  if (repoInfo.isProtected) {
    console.warn(`Warning: Default branch ${repoInfo.defaultBranch} is protected. Commits may fail.`);
  }
  
  // BUG FIX 3: Check write access
  const canWrite = hasWriteAccess(owner, repoInfo.ownerLogin, repoInfo.isPrivate, !!token);
  if (!canWrite) {
    throw { status: 403, message: 'You do not have write access to this repository.' };
  }
  
  const currentFile = await getCurrentFile(octokit, owner, repo, repoInfo.defaultBranch);
  
  const commits: CommitResult[] = [];
  const branch = repoInfo.defaultBranch;
  
  if (currentFile.sha === null) {
    const templates = await getTemplates();
    const initialContent = templates.generateInitialContent();
    const initMessage = 'docs: initialize educational commit log';
    
    const initCommit = await commitFile(
      octokit,
      owner,
      repo,
      branch,
      initialContent,
      initMessage,
      null
    );
    commits.push(initCommit);
  }
  
  const templates = await getTemplates();
  const messages = templates.getCommitMessages(category, commitCount);
  
  for (let i = 0; i < commitCount; i++) {
    onProgress?.(i + 1, commitCount);
    
    const freshFile = await getCurrentFile(octokit, owner, repo, branch);
    
    const message = messages[i];
    
    const newContent = templates.generateFileContent(
      freshFile.content,
      message,
      i + 1
    );
    
    const commit = await commitFile(
      octokit,
      owner,
      repo,
      branch,
      newContent,
      message,
      freshFile.sha
    );
    
    commits.push(commit);
    
    if (i < commitCount - 1) {
      await new Promise(resolve => setTimeout(resolve, COMMIT_DELAY_MS));
    }
  }
  
  return commits;
}
