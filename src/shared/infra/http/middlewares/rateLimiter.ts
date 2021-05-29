import redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '@shared/errors/AppError'

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 5 // 5 requisições por 5 segundos
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (error) { // mais de 5 request em 5 segundos vão gerar um erro
    throw new AppError("To many requests", 429)
  }
}