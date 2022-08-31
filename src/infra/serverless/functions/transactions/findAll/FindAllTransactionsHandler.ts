import { makeFindAllTransactionsController } from "src/main/factories/transactions/FindAllTransactionsController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const findAllTransactionsController = makeFindAllTransactionsController();
export const handler = makeServerlessHandler(findAllTransactionsController);
