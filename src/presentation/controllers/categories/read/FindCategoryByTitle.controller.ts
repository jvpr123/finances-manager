import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";
import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";

import { IFindCategoryByTitleUseCase } from "src/domain/useCases/categories/read/FindCategoryByTitle.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindCategoryByTitleController implements IController {
  constructor(
    private readonly findCategoryByTitleUseCase: IFindCategoryByTitleUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const category = await this.findCategoryByTitleUseCase.execute(
        request?.params?.name
      );

      return ok({ category });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
