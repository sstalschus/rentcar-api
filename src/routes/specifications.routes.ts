import { Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

const specificationsRoutes = Router()

const specificationRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body
  const createSpecificarionService = new CreateSpecificationService(specificationRepository)

  createSpecificarionService.execute({ name, description })

  return response.status(201).send()
})

specificationsRoutes.get('/', (request, response) => {
  const all = specificationRepository.list()
  return response.json(all)
})

export { specificationsRoutes }