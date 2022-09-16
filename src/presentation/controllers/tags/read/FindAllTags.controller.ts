import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindAllTagsUseCase } from "src/domain/useCases/tags/read/FindAllTags.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindAllTagsController implements IController {
  constructor(private readonly findAllTagsUseCase: IFindAllTagsUseCase) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const tags = await this.findAllTagsUseCase.execute();

      return ok({ tags });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
