import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindAllTransactionsUseCase } from "src/domain/useCases/transactions/read/FindAllTransactions.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindAllTransactionsController implements IController {
  constructor(
    private readonly findAllTransactionsUseCase: IFindAllTransactionsUseCase
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const transactions = await this.findAllTransactionsUseCase.execute();

      return ok({ transactions });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
