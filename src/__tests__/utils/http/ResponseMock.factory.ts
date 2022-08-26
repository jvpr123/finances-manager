import { IHttpResponse } from "src/presentation/protocols/Http.interface";

export const makeFakeResponse = (
  statusCode: number,
  body: any
): IHttpResponse => ({ statusCode, body });
