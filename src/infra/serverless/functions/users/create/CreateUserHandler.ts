import { makeCreateUserController } from "src/main/factories/users/CreateUserController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const createUserController = makeCreateUserController();
export const handler = makeServerlessHandler(createUserController);
