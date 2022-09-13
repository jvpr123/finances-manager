import { makeUpdateCategoryController } from "src/main/factories/categories/UpdateCategoryController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const updateCategoryController = makeUpdateCategoryController();
export const handler = makeServerlessHandler(updateCategoryController);
