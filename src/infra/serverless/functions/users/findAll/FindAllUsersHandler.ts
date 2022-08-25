import { makeFindAllUsersController } from "src/main/factories/users/FindAllUsersController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const findAllUsersController = makeFindAllUsersController();
export const handler = makeServerlessHandler(findAllUsersController);
