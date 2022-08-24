import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindUserByEmailUseCase } from "src/domain/useCases/users/read/FindUserByEmail.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindUserByEmailController implements IController {
  constructor(
    private readonly findUserByEmailUseCase: IFindUserByEmailUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.findUserByEmailUseCase.execute(
        request?.params?.email
      );

      return ok({ user });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
