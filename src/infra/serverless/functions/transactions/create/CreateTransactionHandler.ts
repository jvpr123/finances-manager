import { makeCreateTransactionController } from "src/main/factories/transactions/CreateTransactionController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const createTransactionsController = makeCreateTransactionController();
export const handler = makeServerlessHandler(createTransactionsController);
