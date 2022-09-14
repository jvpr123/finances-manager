import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { ok } from "src/presentation/utils/http/HttpResponse.factory";

import { IDeleteCategoryUseCase } from "src/domain/useCases/categories/delete/DeleteCategory.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class DeleteCategoryController implements IController {
  constructor(private readonly deleteCategoryUseCase: IDeleteCategoryUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const result = await this.deleteCategoryUseCase.execute(
        request?.params?.id
      );

      return ok({ isDeleted: result });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
