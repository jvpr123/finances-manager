import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IUpdateCategoryUseCase } from "src/domain/useCases/categories/update/UpdateCategory.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class UpdateCategoryController implements IController {
  constructor(private readonly updateCategoryUseCase: IUpdateCategoryUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const category = await this.updateCategoryUseCase.execute(request?.body);
      return ok({ updated: true, category });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
