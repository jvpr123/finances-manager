import {
  IHttpRequest,
  IHttpResponse,
} from "@core/presentation/protocols/Http.interface";
import { IController } from "@core/presentation/protocols/Controller.interface";
import { created } from "@core/presentation/utils/http/HttpResponse.factory";

import { ICreateUserUseCase } from "@core/domain/useCases/users/create/CreateUser.interface";

import { errorHandler } from "@core/errors/Handler.error";

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
