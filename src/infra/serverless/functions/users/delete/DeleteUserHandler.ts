import { makeDeleteUserController } from "src/main/factories/users/DeleteUserController.factory copy";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const deleteUserController = makeDeleteUserController();
export const handler = makeServerlessHandler(deleteUserController);
