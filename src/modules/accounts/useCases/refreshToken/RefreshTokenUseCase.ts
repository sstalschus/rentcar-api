import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'


interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
    // O Id do user vem dentro do subject do token
    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!')
    }

    // Se já existir o refresh token, vamos apagar o existente e criar um novo
    await this.usersTokensRepository.deleteById(userToken.id)

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: sub
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }