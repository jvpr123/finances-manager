import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindTransactionByIdUseCase } from "src/domain/useCases/transactions/read/FindTransactionById.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindTransactionByIdController implements IController {
  constructor(
    private readonly findTransactionByIdUseCase: IFindTransactionByIdUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const transaction = await this.findTransactionByIdUseCase.execute(
        request?.params?.id
      );

      return ok({ transaction });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
