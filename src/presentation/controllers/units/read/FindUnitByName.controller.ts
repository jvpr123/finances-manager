import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindUnitByNameUseCase } from "src/domain/useCases/units/read/IFindUnitByName.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindUnitByNameController implements IController {
  constructor(private readonly findUnitByNameUseCase: IFindUnitByNameUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const unit = await this.findUnitByNameUseCase.execute(
        request?.params?.name
      );

      return ok({ unit });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
