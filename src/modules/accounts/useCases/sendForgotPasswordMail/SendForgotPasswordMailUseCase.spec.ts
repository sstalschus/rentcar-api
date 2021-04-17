import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe('Send Forgot Mail', () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider)
  })

  it('should be able to send a forgot passsword mail to user', async () => {
    // function do jest que espia determinada classe para verificar se a função foi chamada, se o sendMAil for executado saberemos
    const sendMail = spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "593175",
      email: "elevibe@pa.gy",
      name: "Amanda Rodriquez",
      password: "12345"
    })

    await sendForgotPasswordMailUseCase.execute("elevibe@pa.gy")

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("buofo@dag.bs")
    ).rejects.toEqual(new AppError('User does not exists'))
  })

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      driver_license: "12312",
      email: "ravrtbxs@rrr.gy",
      name: "Samara Francisca",
      password: "12345"
    })

    await sendForgotPasswordMailUseCase.execute("ravrtbxs@rrr.gy")

    expect(generateTokenMail).toHaveBeenCalled()
  })
})