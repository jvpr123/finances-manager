import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IUpdateUserUseCase } from "src/domain/useCases/users/update/UpdateUser.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserUseCase: IUpdateUserUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.updateUserUseCase.execute(request?.body);
      return ok({ updated: true, user });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
