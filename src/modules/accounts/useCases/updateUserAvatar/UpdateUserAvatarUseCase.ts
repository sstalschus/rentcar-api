import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    user.avatar = avatarFile

    // Aqui já é feito a atualização do avatar no BD
    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }