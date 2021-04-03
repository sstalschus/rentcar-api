import { v4 as uuidV4 } from 'uuid'

class Car {

  id: string

  name: string

  description: string

  daily_rate: string

  available: boolean

  license_plate: string

  fine_amount: number

  brand: string

  created_at: Date

  category_id: string

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
      this.available = true
      this.created_at = new Date()
    }
  }
}

export { Car }