import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";
import { makeFindTagByTitleController } from "src/main/factories/tags/FindTagByTitleController.factory";

const findTagByTitleController = makeFindTagByTitleController();
export const handler = makeServerlessHandler(findTagByTitleController);
