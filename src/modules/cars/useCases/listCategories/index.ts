import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCases } from "./ListCategoriesUseCases";

const categoriesRepository = null
const listCategoriesUseCases = new ListCategoriesUseCases(categoriesRepository)
const listCategoriesController = new ListCategoriesController(listCategoriesUseCases)

export { listCategoriesController }