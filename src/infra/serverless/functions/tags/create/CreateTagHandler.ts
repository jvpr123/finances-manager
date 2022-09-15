import { makeCreateTagController } from "src/main/factories/tags/CreateTagController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const createTagController = makeCreateTagController();
export const handler = makeServerlessHandler(createTagController);
