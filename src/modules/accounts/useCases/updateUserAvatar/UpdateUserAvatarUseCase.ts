import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

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

    if (user.avatar)
      await deleteFile(`./tmp/avatar/${user.avatar}`)

    user.avatar = avatarFile

    // Aqui já é feito a atualização do avatar no BD
    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }