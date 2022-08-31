import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IDeleteTransactionUseCase } from "src/domain/useCases/transactions/delete/DeleteTransaction.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class DeleteTransactionController implements IController {
  constructor(
    private readonly deleteTransactionUseCase: IDeleteTransactionUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.deleteTransactionUseCase.execute(
        request?.params?.id
      );

      return ok({ isDeleted: result });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
