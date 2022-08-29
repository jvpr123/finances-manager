import { makeFindUnitByNameController } from "src/main/factories/units/FindUnitByNameController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const findUnitByNameController = makeFindUnitByNameController();
export const handler = makeServerlessHandler(findUnitByNameController);
