import { IController } from "src/presentation/protocols/Controller.interface";
import { created } from "src/presentation/utils/http/HttpResponse.factory";
import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";

import { ICreateCategoryUseCase } from "src/domain/useCases/categories/create/CreateCategory.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class CreateCategoryController implements IController {
  constructor(private readonly createCategoryUseCase: ICreateCategoryUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const category = await this.createCategoryUseCase.execute(request?.body);
      return created({ category });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
