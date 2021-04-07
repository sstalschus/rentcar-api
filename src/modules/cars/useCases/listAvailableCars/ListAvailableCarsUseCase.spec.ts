import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List cars', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all avilable cars', async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car Description",
      daily_rate: 150.00,
      license_plate: "ABCD-12",
      fine_amount: 110,
      brand: "Car_brand",
      category_id: "category_id"
    })
    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car Description",
      daily_rate: 150.00,
      license_plate: "ABCD-12",
      fine_amount: 110,
      brand: "Car_brand_test_brand",
      category_id: "category_id"
    })
    const cars = await listCarsUseCase.execute({ brand: 'Car_brand_test_brand' })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3 test name",
      description: "Car Description",
      daily_rate: 150.00,
      license_plate: "ABCD-12",
      fine_amount: 110,
      brand: "Car_brand",
      category_id: "category_id"
    })
    const cars = await listCarsUseCase.execute({ name: "Car 3 test name" })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Car Description",
      daily_rate: 150.00,
      license_plate: "ABCD-12",
      fine_amount: 110,
      brand: "Car_brand",
      category_id: "category_id_test"
    })
    const cars = await listCarsUseCase.execute({ category_id: "category_id_test" })

    expect(cars).toEqual([car])
  })
})
