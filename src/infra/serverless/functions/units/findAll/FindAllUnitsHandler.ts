import { makeFindAllUnitsController } from "src/main/factories/units/FindAllUnitsController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const findAllUnitsController = makeFindAllUnitsController();
export const handler = makeServerlessHandler(findAllUnitsController);
