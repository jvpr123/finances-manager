import { makeUpdateTransactionController } from "src/main/factories/transactions/UpdateTransactionController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const updateTransactionController = makeUpdateTransactionController();
export const handler = makeServerlessHandler(updateTransactionController);
