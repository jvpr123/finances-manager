import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";
import { makeFindTagByIdController } from "src/main/factories/tags/FindTagByIdController.factory";

const findTagByIdController = makeFindTagByIdController();
export const handler = makeServerlessHandler(findTagByIdController);
