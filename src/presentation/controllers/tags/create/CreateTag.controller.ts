import { IController } from "src/presentation/protocols/Controller.interface";
import { created } from "src/presentation/utils/http/HttpResponse.factory";
import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";

import { ICreateTagUseCase } from "src/domain/useCases/tags/create/CreateTag.interface";

import { errorHandler } from "src/errors/utils/Handler.error";

export class CreateTagController implements IController {
  constructor(private readonly createTagUseCase: ICreateTagUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const tag = await this.createTagUseCase.execute(request?.body);
      return created({ tag });
    } catch (error: any) {
      return errorHandler(error);
    }
  }
}
