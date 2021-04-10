import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@teste.com',
      password: '1234',
      name: 'User Test'

    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'user.email@teste.com',
      password: 'user.password.teste'
    })
    ).rejects.toEqual(new AppError("Email or password incorrect!"))
  })

  it('should not be able to authenticate with incorrect password', async () => {

    const user: ICreateUserDTO = {
      driver_license: '111111',
      email: 'user2@teste.com',
      password: '12345',
      name: 'User Test'

    }

    await createUserUseCase.execute(user)
    expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrectPassword'
    })
    ).rejects.toEqual(new AppError("Email or password incorrect!"))
  })

  it('should not be able to authenticate with incorrect email', async () => {
    const user: ICreateUserDTO = {
      driver_license: '1234',
      email: 'user3@teste.com',
      password: '12346',
      name: 'User Test'

    }

    await createUserUseCase.execute(user)
    expect(authenticateUserUseCase.execute({
      email: 'incorrect@email',
      password: user.password
    })
    ).rejects.toEqual(new AppError("Email or password incorrect!"))
  })
})