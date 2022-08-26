import { makeCreateUnitController } from "src/main/factories/units/CreateUnitController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const createUnitController = makeCreateUnitController();
export const handler = makeServerlessHandler(createUnitController);
