import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import { router } from './routes'
import swaggerFile from './swagger.json'

import './database'

import './shared/container'
import { AppError } from './errors/AppError'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal serve error - ${error.message}`
  })
})

app.listen(3333, () => console.log('Server is running!'))
