import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IFindAllCategoriesUseCase } from "src/domain/useCases/categories/read/FindAllCategories.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class FindAllCategoriesController implements IController {
  constructor(
    private readonly findAllCategoriesUseCase: IFindAllCategoriesUseCase
  ) {}

  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const categories = await this.findAllCategoriesUseCase.execute();

      return ok({ categories });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
