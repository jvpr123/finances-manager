import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindAllUnitsUseCase } from "src/domain/useCases/units/read/IFindAllUnits.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindAllUnitsController implements IController {
  constructor(private readonly findAllUnitsUseCase: IFindAllUnitsUseCase) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const units = await this.findAllUnitsUseCase.execute();

      return ok({ units });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
