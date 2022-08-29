import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindUnitByIdUseCase } from "src/domain/useCases/units/read/IFindUnitById.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindUnitByIdController implements IController {
  constructor(private readonly findUnitByIdUseCase: IFindUnitByIdUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const unit = await this.findUnitByIdUseCase.execute(request?.params?.id);

      return ok({ unit });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
