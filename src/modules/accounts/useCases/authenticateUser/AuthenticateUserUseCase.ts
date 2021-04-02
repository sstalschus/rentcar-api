import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verificar se user existe
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    // Se a senha estiver correta gerar o JWT
    const token = sign({}, 'dc50239d02d1d3a092e8c12d0084800d', {
      subject: user.id,
      expiresIn: '1d'
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }