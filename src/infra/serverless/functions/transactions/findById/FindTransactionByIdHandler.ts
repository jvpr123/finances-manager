import { makeFindTransactionByIdController } from "src/main/factories/transactions/FindTransactionByIdController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const findTransactionByIdController = makeFindTransactionByIdController();
export const handler = makeServerlessHandler(findTransactionByIdController);
