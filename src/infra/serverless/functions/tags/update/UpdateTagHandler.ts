import { makeUpdateTagController } from "src/main/factories/tags/UpdateTagController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const updateTagController = makeUpdateTagController();
export const handler = makeServerlessHandler(updateTagController);
