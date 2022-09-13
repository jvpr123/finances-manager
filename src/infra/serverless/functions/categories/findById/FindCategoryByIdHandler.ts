import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";
import { makeFindCategoryByIdController } from "src/main/factories/categories/FindCategoryByIdController.factory";

const findCategoryByIdController = makeFindCategoryByIdController();
export const handler = makeServerlessHandler(findCategoryByIdController);
