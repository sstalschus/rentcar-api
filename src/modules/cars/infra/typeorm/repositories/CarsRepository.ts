import { getRepository, Repository } from "typeorm";

import { Car } from "../entities/Car";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";


class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }
  async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      fine_amount,
      brand,
      category_id,
      license_plate,
      daily_rate
    })

    await this.repository.save(car)

    return car
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })

    return car
  }

  findAvailable(): Promise<Car[]> {
    throw new Error("Method not implemented.");
  }
}

export { CarsRepository }