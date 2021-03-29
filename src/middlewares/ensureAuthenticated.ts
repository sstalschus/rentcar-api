import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { AppError } from "../errors/AppError";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
    const { sub: user_id } = verify(token, 'dc50239d02d1d3a092e8c12d0084800d') as IPayload // forçando a retirada do sub do token

    // verificar se o usuário existe no repositório
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    request.user = {
      id: user_id
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }

}