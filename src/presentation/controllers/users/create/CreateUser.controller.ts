import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { created } from "src/presentation/utils/http/HttpResponse.factory";

import { ICreateUserUseCase } from "src/domain/useCases/users/create/CreateUser.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class CreateUserController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.createUserUseCase.execute(request.body);
      return created({ user });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
