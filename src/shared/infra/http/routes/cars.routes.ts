import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const upload = multer(uploadConfig.upload('./tmp/cars'))

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarsImages = new UploadCarImagesController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarsImages.handle)

export { carsRoutes }