import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IDeleteTagUseCase } from "src/domain/useCases/tags/delete/DeleteTag.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class DeleteTagController implements IController {
  constructor(private readonly deleteTagUseCase: IDeleteTagUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.deleteTagUseCase.execute(request?.params?.id);

      return ok({ isDeleted: result });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
