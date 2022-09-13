import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";
import { makeFindAllCategoriesController } from "src/main/factories/categories/FindAllCategoriesController.factory";

const findAllCategoriesController = makeFindAllCategoriesController();
export const handler = makeServerlessHandler(findAllCategoriesController);
