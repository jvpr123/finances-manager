import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IUpdateTransactionUseCase } from "src/domain/useCases/transactions/update/UpdateTransaction.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class UpdateTransactionController implements IController {
  constructor(
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const transaction = await this.updateTransactionUseCase.execute(
        request?.body
      );

      return ok({ updated: true, transaction });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
