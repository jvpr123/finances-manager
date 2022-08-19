import { IHttpRequest, IHttpResponse } from "./Http.interface";

export interface IController {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
