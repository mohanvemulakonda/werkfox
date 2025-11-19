/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, consider Redis-based solution
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the requester (IP, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result with remaining requests and reset time
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60 * 1000, maxRequests: 60 } // Default: 60 requests per minute
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // If no entry exists or the window has expired, create a new one
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.interval;
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime,
    });

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: resetTime,
    };
  }

  // Increment the count
  entry.count += 1;

  // Check if limit exceeded
  if (entry.count > config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    reset: entry.resetTime,
  };
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to a generic identifier
  return 'unknown';
}

/**
 * Middleware helper to apply rate limiting to API routes
 * @example
 * ```ts
 * export async function POST(request: Request) {
 *   const rateLimitResult = await applyRateLimit(request, {
 *     interval: 60 * 1000, // 1 minute
 *     maxRequests: 10, // 10 requests per minute
 *   });
 *
 *   if (!rateLimitResult.success) {
 *     return NextResponse.json(
 *       { error: 'Too many requests. Please try again later.' },
 *       {
 *         status: 429,
 *         headers: rateLimitResult.headers,
 *       }
 *     );
 *   }
 *
 *   // Process the request...
 * }
 * ```
 */
export async function applyRateLimit(
  request: Request,
  config?: RateLimitConfig
): Promise<{
  success: boolean;
  headers: Record<string, string>;
}> {
  const ip = getClientIp(request);
  const result = rateLimit(ip, config);

  const headers = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };

  if (!result.success) {
    headers['Retry-After'] = Math.ceil((result.reset - Date.now()) / 1000).toString();
  }

  return {
    success: result.success,
    headers,
  };
}

/**
 * Predefined rate limit configs for common use cases
 */
export const RateLimitPresets = {
  // Very strict - for sensitive operations like login, password reset
  STRICT: { interval: 60 * 1000, maxRequests: 5 }, // 5 requests per minute

  // Moderate - for API endpoints with auth
  MODERATE: { interval: 60 * 1000, maxRequests: 30 }, // 30 requests per minute

  // Lenient - for public endpoints like contact forms
  LENIENT: { interval: 60 * 1000, maxRequests: 10 }, // 10 requests per minute

  // Very lenient - for read-only public endpoints
  VERY_LENIENT: { interval: 60 * 1000, maxRequests: 60 }, // 60 requests per minute
};
