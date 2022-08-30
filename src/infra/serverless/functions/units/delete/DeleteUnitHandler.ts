import { makeDeleteUnitController } from "src/main/factories/units/DeleteUnitController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const deleteUnitController = makeDeleteUnitController();
export const handler = makeServerlessHandler(deleteUnitController);
