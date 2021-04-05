import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/creteSpecification/CreateSpecificationController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }