import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IUpdateUnitUseCase } from "src/domain/useCases/units/update/IUpdateUnit.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class UpdateUnitController implements IController {
  constructor(private readonly updateUnitUseCase: IUpdateUnitUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const unit = await this.updateUnitUseCase.execute(request?.body);
      return ok({ updated: true, unit });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
