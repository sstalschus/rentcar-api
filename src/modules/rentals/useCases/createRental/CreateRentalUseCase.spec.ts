import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')

  })


  it('should not be able to create a new rental if there is another open to the same id', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '23131',
      car_id: '3333233',
      expected_return_date: dayAdd24Hours
    })

    await expect(createRentalUseCase.execute({
      user_id: '23131',
      car_id: '321',
      expected_return_date: dayAdd24Hours
    })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '2313',
      car_id: '333333',
      expected_return_date: dayAdd24Hours
    })
    await expect(createRentalUseCase.execute({
      user_id: '231233',
      car_id: '333333',
      expected_return_date: dayAdd24Hours
    })
    ).rejects.toEqual(new AppError("Car is unavailable"))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '2313233',
      car_id: '333332333',
      expected_return_date: dayAdd24Hours
    })
    await expect(createRentalUseCase.execute({
      user_id: '231233',
      car_id: '333333',
      expected_return_date: dayjs().toDate()
    })
    ).rejects.toEqual(new AppError("Invalid return time!"))
  })
})