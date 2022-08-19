import { makeFakeUserInput } from "../UserMocks.factory";
import {
  IHttpRequest,
  IHttpResponse,
} from "@presentation/protocols/Http.interface";

export const makeFakeRequest = (): IHttpRequest => ({
  body: { ...makeFakeUserInput() },
});

export const makeFakeResponse = (
  statusCode: number,
  body: any
): IHttpResponse => ({ statusCode, body });
