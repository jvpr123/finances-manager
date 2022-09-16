import { makeDeleteTagController } from "src/main/factories/tags/DeleteTagController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const deleteTagController = makeDeleteTagController();
export const handler = makeServerlessHandler(deleteTagController);
