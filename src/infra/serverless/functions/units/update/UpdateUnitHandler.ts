import { makeUpdateUnitController } from "src/main/factories/units/UpdateUnitController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const updateUnitController = makeUpdateUnitController();
export const handler = makeServerlessHandler(updateUnitController);
