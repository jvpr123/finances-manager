import { makeFindUserByEmailController } from "src/main/factories/users/FindUserByEmailController.factory";
import { makeServerlessHandler } from "src/infra/serverless/factories/Handler.factory";

const findUserByEmailController = makeFindUserByEmailController();
export const handler = makeServerlessHandler(findUserByEmailController);
