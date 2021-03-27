import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCategoriesUseCases } from './ListCategoriesUseCases'

class ListCategoriesController {


  async handle(request: Request, response: Response): Promise<Response> {

    const listCategoriesUseCases = container.resolve(ListCategoriesUseCases)

    const all = await listCategoriesUseCases.execute()

    return response.json(all)
  }
}

export { ListCategoriesController }