import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { created } from "src/presentation/utils/http/HttpResponse.factory";

import { ICreateTransactionUseCase } from "src/domain/useCases/transactions/create/CreateTransaction.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class CreateTransactionController implements IController {
  constructor(
    private readonly createTransactionUseCase: ICreateTransactionUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const transaction = await this.createTransactionUseCase.execute(
        request?.body
      );
      return created({ transaction });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
