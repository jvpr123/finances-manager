import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";
import { makeFindCategoryByTitleController } from "src/main/factories/categories/FindCategoryByTitleController.factory";

const findCategoryByTitleController = makeFindCategoryByTitleController();
export const handler = makeServerlessHandler(findCategoryByTitleController);
