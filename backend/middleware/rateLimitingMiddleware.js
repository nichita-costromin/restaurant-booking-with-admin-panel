import Redis from "ioredis";
const redis = new Redis();

const MAX_REQUESTS_PER_IP = 3;
const WINDOW_IN_SECONDS = 24 * 60 * 60;

// CLEAR REDIS KEYS: redis-cli FLUSHALL

// CHECK FOR ACTIVE REDIS KEYS: redis-cli KEYS '*'

// START SERVER: redis-server


const rateLimitingMiddleware = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    const redisKey = `rate_limit:${ip}`;

    // Increment request count for the IP
    const requests = await redis.incr(redisKey);

    // First Request Countdown Timer
    req === 1 ? await redis.expire(redisKey, WINDOW_IN_SECONDS) : null;

    // Rate Limit Exceeded
    if (requests > MAX_REQUESTS_PER_IP) {
      const ttl = await redis.ttl(redisKey);
      return res.status(429).json({
        error: "Too many requests.",
        message: `You have exceeded the maximum of ${MAX_REQUESTS_PER_IP} requests. Try again in ${ttl} seconds.`,
      });
    }
    next();
  } catch (error) {
    console.error("Error in rate limiting middleware:", error);
    next();
  }
};

export default rateLimitingMiddleware;