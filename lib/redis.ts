import { Redis } from '@upstash/redis';

// Initialize Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Cache utilities
export const cache = {
  /**
   * Get cached value or fetch and cache it
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds: number = 3600
  ): Promise<T> {
    const cached = await redis.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await fetcher();
    await redis.setex(key, ttlSeconds, value);
    return value;
  },

  /**
   * Invalidate cache by key or pattern
   */
  async invalidate(key: string): Promise<void> {
    await redis.del(key);
  },

  /**
   * Invalidate multiple keys by pattern
   */
  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },
};

// Rate limiting utilities
export const rateLimit = {
  /**
   * Check if request is rate limited
   * @returns true if rate limited, false if allowed
   */
  async isLimited(
    identifier: string,
    limit: number = 10,
    windowSeconds: number = 60
  ): Promise<{ limited: boolean; remaining: number; reset: number }> {
    const key = `ratelimit:${identifier}`;
    const now = Date.now();
    const windowStart = now - windowSeconds * 1000;

    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count requests in window
    const count = await redis.zcard(key);

    if (count >= limit) {
      const oldestEntry = await redis.zrange(key, 0, 0, { withScores: true });
      const reset = oldestEntry.length > 0
        ? Math.ceil((Number(oldestEntry[0].score) + windowSeconds * 1000 - now) / 1000)
        : windowSeconds;

      return { limited: true, remaining: 0, reset };
    }

    // Add new request
    await redis.zadd(key, { score: now, member: `${now}-${Math.random()}` });
    await redis.expire(key, windowSeconds);

    return { limited: false, remaining: limit - count - 1, reset: windowSeconds };
  },
};

// Session utilities
export const session = {
  /**
   * Store session data
   */
  async set(sessionId: string, data: Record<string, unknown>, ttlSeconds: number = 86400): Promise<void> {
    await redis.setex(`session:${sessionId}`, ttlSeconds, data);
  },

  /**
   * Get session data
   */
  async get<T = Record<string, unknown>>(sessionId: string): Promise<T | null> {
    return redis.get<T>(`session:${sessionId}`);
  },

  /**
   * Delete session
   */
  async destroy(sessionId: string): Promise<void> {
    await redis.del(`session:${sessionId}`);
  },

  /**
   * Extend session TTL
   */
  async refresh(sessionId: string, ttlSeconds: number = 86400): Promise<void> {
    await redis.expire(`session:${sessionId}`, ttlSeconds);
  },
};

// Queue utilities (simple job queue)
export const queue = {
  /**
   * Add job to queue
   */
  async push(queueName: string, job: Record<string, unknown>): Promise<void> {
    await redis.lpush(`queue:${queueName}`, {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      data: job,
      createdAt: new Date().toISOString(),
    });
  },

  /**
   * Get next job from queue (FIFO)
   */
  async pop<T = Record<string, unknown>>(queueName: string): Promise<{ id: string; data: T; createdAt: string } | null> {
    return redis.rpop(`queue:${queueName}`);
  },

  /**
   * Get queue length
   */
  async length(queueName: string): Promise<number> {
    return redis.llen(`queue:${queueName}`);
  },
};

// Cache keys helpers
export const cacheKeys = {
  // Products
  products: () => 'products:all',
  product: (id: number) => `product:${id}`,
  productsBySku: (sku: string) => `product:sku:${sku}`,

  // Customers
  customers: () => 'customers:all',
  customer: (id: number) => `customer:${id}`,

  // Vendors
  vendors: () => 'vendors:all',
  vendor: (id: number) => `vendor:${id}`,

  // Invoices
  invoices: () => 'invoices:all',
  invoice: (id: number) => `invoice:${id}`,

  // Dashboard stats
  dashboardStats: () => 'dashboard:stats',

  // Settings
  companySettings: () => 'settings:company',
};
