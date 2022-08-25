import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindAllUsersUseCase } from "src/domain/useCases/users/read/FindAllUsers.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindAllUsersController implements IController {
  constructor(private readonly findAllUsersUseCase: IFindAllUsersUseCase) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const users = await this.findAllUsersUseCase.execute();

      return ok({ users });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
