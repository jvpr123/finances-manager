import { IController } from "@presentation/protocols/Controller.interface";
import {
  IHttpRequest,
  IHttpResponse,
} from "@presentation/protocols/Http.interface";
import {
  badRequest,
  created,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";

import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";
import { IValidator } from "../../protocols/Validator.interface";

export class CreateUserController implements IController {
  constructor(
    private readonly validator: IValidator,
    private readonly createUserUseCase: ICreateUserUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const validationErrors = this.validator.validate(request.body);

      if (validationErrors.length > 0) return badRequest(validationErrors);

      const user = await this.createUserUseCase.execute(request.body);
      return created({ user });
    } catch (error: any) {
      return internalServerError(error.message);
    }
  }
}
