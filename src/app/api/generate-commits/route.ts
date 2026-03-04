import { NextRequest, NextResponse } from 'next/server';
import { generateEducationalCommits } from '@/app/lib/github';
import { validateRequest, parseRepoUrl } from '@/app/lib/validation';

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds

/**
 * Check if the IP has exceeded rate limit
 * BUG FIX 4: Clean up expired entries before every check to prevent memory leak
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  
  // CLEANUP: Remove expired entries to prevent memory leak
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetTime) {
      rateLimitMap.delete(key);
    }
  }
  
  const record = rateLimitMap.get(ip);
  
  // No record or expired - create new record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  // Check if limit exceeded
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  // Increment count
  record.count++;
  return true;
}

/**
 * Extract client IP from request headers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  return realIP || 'unknown';
}

interface RequestBody {
  repoUrl: string;
  token: string;
  commitCount: number;
  category: string;
}

/**
 * POST Handler - Generate commits to repository
 */
export async function POST(request: NextRequest) {
  try {
    // STEP 1: Get client IP
    const ip = getClientIP(request);
    
    // STEP 2: Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.', code: 'RATE_LIMIT_EXCEEDED' },
        { status: 429 }
      );
    }
    
    // STEP 3: Parse JSON body
    let body: RequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }
    
    // STEP 4: Validate request
    const validation = validateRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors, code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }
    
    // STEP 5: Parse repository URL
    const parsedRepo = parseRepoUrl(body.repoUrl);
    if (!parsedRepo) {
      return NextResponse.json(
        { error: 'Invalid repository URL format', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }
    
    // STEP 6: Generate commits
    const commits = await generateEducationalCommits(
      body.token,
      parsedRepo.owner,
      parsedRepo.repo,
      body.commitCount,
      body.category
    );
    
    // STEP 7: Return success response
    return NextResponse.json({
      success: true,
      categoryUsed: body.category,
      commits: commits.map((c: { sha: string; message: string; timestamp: string; branch: string; url: string }) => ({
        sha: c.sha.substring(0, 7),
        message: c.message,
        timestamp: c.timestamp,
        branch: c.branch,
        url: c.url
      })),
      repository: `${parsedRepo.owner}/${parsedRepo.repo}`,
      totalCommits: commits.length,
      warnings: validation.warnings
    });
    
  } catch (error: unknown) {
    // STEP 8: Handle errors safely
    const err = error as { status?: number; message?: string; errors?: unknown[] };
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'An unexpected error occurred.';
    const errorDetails = err.errors ? JSON.stringify(err.errors) : undefined;
    
    // Map to appropriate HTTP response
    switch (errorStatus) {
      case 401:
        return NextResponse.json(
          { error: 'Invalid or expired token.', code: 'UNAUTHORIZED' },
          { status: 401 }
        );
      case 403:
        return NextResponse.json(
          { error: errorMessage || 'Access denied.', code: 'FORBIDDEN' },
          { status: 403 }
        );
      case 404:
        return NextResponse.json(
          { error: 'Repository not found.', code: 'NOT_FOUND' },
          { status: 404 }
        );
      case 422:
        return NextResponse.json(
          { error: errorMessage || 'Failed to create commit.', code: 'UNPROCESSABLE_ENTITY' },
          { status: 422 }
        );
      default:
        return NextResponse.json(
          { error: errorMessage, details: errorDetails, code: 'INTERNAL_ERROR' },
          { status: errorStatus }
        );
    }
  }
}

/**
 * GET Handler - Return API information
 */
export async function GET() {
  return NextResponse.json({
    name: 'Git Commit Tool API',
    version: '2.0.0',
    description: 'Educational GitHub API automation',
    endpoints: {
      POST: {
        path: '/api/generate-commits',
        body: {
          repoUrl: 'string (required)',
          token: 'string (required)',
          commitCount: 'number (required, 1-1000)',
          category: 'string (required)'
        }
      }
    },
    security: {
      note: 'Tokens are handled in memory only and never stored.',
      warnings: ['Educational Use Only', 'Respect GitHub API rate limits', 'Do not use for contribution manipulation']
    },
    categories: {
      groups: [
        'Business & Website Projects',
        'Software Development',
        'AI & Data',
        'DevOps & Infrastructure',
        'Security',
        'Curated & Knowledge Repos',
        'Emerging Tech',
        'Repository Types'
      ],
      total: 47
    }
  });
}
