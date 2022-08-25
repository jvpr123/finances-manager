import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IDeleteUserUseCase } from "src/domain/useCases/users/delete/DeleteUser.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.deleteUserUseCase.execute(request?.params?.id);

      return ok({ isDeleted: result });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
