import { IController } from "@presentation/protocols/Controller.interface";
import {
  IHttpRequest,
  IHttpResponse,
} from "@presentation/protocols/Http.interface";
import {
  created,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";

import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";

export class CreateUserController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.createUserUseCase.execute(request.body);
      return created({ user });
    } catch (error: any) {
      return internalServerError(error.message);
    }
  }
}
