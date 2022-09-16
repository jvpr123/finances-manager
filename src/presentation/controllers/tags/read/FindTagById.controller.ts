import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";
import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";

import { IFindTagByIdUseCase } from "src/domain/useCases/tags/read/FindTagById.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindTagByIdController implements IController {
  constructor(private readonly findTagByIdUseCase: IFindTagByIdUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const tag = await this.findTagByIdUseCase.execute(request?.params?.id);

      return ok({ tag });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
