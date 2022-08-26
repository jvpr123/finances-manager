import { makeUpdateUserController } from "src/main/factories/users/UpdateUserController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const updateUserController = makeUpdateUserController();
export const handler = makeServerlessHandler(updateUserController);
