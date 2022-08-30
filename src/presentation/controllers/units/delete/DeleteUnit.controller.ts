import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IDeleteUnitUseCase } from "src/domain/useCases/units/delete/DeleteUnit.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class DeleteUnitController implements IController {
  constructor(private readonly deleteUnitUseCase: IDeleteUnitUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.deleteUnitUseCase.execute(request?.params?.id);

      return ok({ isDeleted: result });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
