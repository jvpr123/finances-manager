import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { created } from "src/presentation/utils/http/HttpResponse.factory";

import { ICreateUnitUseCase } from "src/domain/useCases/units/create/ICreateUnit.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class CreateUnitController implements IController {
  constructor(private readonly createUnitUseCase: ICreateUnitUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const unit = await this.createUnitUseCase.execute(request?.body);
      return created({ unit });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
