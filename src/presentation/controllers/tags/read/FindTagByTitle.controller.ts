import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";
import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";

import { IFindTagByTitleUseCase } from "src/domain/useCases/tags/read/FindTagByTitle.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindTagByTitleController implements IController {
  constructor(private readonly findTagByTitleUseCase: IFindTagByTitleUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const tag = await this.findTagByTitleUseCase.execute(
        request?.params?.title
      );

      return ok({ tag });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
