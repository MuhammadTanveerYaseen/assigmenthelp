import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  maxRequests: number;  // Maximum requests allowed
  windowMs: number;     // Time window in milliseconds
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  Array.from(rateLimitStore.entries()).forEach(([key, value]) => {
    if (value.resetTime <= now) {
      rateLimitStore.delete(key);
    }
  });
}, 60000); // Clean up every minute

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(config: RateLimitConfig) {
  return async function rateLimitMiddleware(
    request: NextRequest
  ): Promise<NextResponse | null> {
    const ip = getClientIp(request);
    const now = Date.now();
    
    const entry = rateLimitStore.get(ip);
    
    if (!entry) {
      // First request from this IP
      rateLimitStore.set(ip, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return null;
    }

    if (entry.resetTime <= now) {
      // Reset window has passed
      rateLimitStore.set(ip, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return null;
    }

    entry.count += 1;
    if (entry.count > config.maxRequests) {
      // Rate limit exceeded
      return NextResponse.json(
        { error: 'Too many requests, please try again later.' },
        { status: 429 }
      );
    }

    return null;
  };
} 