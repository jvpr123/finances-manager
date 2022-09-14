import { makeDeleteCategoryController } from "src/main/factories/categories/DeleteCategoryController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const deleteCategoryController = makeDeleteCategoryController();
export const handler = makeServerlessHandler(deleteCategoryController);
