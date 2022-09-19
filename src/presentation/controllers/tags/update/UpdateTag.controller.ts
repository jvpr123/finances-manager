import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IUpdateTagUseCase } from "src/domain/useCases/tags/update/UpdateTag.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class UpdateTagController implements IController {
  constructor(private readonly updateTagUseCase: IUpdateTagUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const tag = await this.updateTagUseCase.execute(request?.body);
      return ok({ updated: true, tag });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
