import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";
import { makeFindAllTagsController } from "src/main/factories/tags/FindAllTagsController.factory";

const findAllTagsController = makeFindAllTagsController();
export const handler = makeServerlessHandler(findAllTagsController);
