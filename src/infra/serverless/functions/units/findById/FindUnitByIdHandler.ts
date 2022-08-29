import { makeFindUnitByIdController } from "src/main/factories/units/FindUnitByIdController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const findUnitByIdController = makeFindUnitByIdController();
export const handler = makeServerlessHandler(findUnitByIdController);
