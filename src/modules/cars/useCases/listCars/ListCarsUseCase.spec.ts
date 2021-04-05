import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"


let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List cars', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all avilable cars', async () => {
    await listCarsUseCase.execute()
  })
})