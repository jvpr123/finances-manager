import { makeDeleteTransactionController } from "src/main/factories/transactions/DeleteTransactionController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const deleteTransactionController = makeDeleteTransactionController();
export const handler = makeServerlessHandler(deleteTransactionController);
