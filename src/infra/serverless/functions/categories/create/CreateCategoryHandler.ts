import { makeCreateCategoryController } from "src/main/factories/categories/CreateCategoryController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const createCategoryController = makeCreateCategoryController();
export const handler = makeServerlessHandler(createCategoryController);
