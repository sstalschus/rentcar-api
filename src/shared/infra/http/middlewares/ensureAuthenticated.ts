import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  // Se existir é necessário desestruturar o token que vem na estrutura Beare
  const [, token] = authHeader.split(' ')

  try {
    // Se der erro o verify lança uma exceção por isso o trycatch
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload // forçando a retirada do sub do token


    request.user = {
      id: user_id
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }

}