import {
  makeFakeCreateUserInput,
  makeFakeUpdateUserInput,
} from "../UserMocks.factory";
import {
  IHttpRequest,
  IHttpResponse,
} from "src/presentation/protocols/Http.interface";

export const makeFakeCreateUserRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateUserInput() },
});

export const makeFakeUpdateUserRequest = (): IHttpRequest => ({
  body: { ...makeFakeUpdateUserInput() },
});

export const makeFakeResponse = (
  statusCode: number,
  body: any
): IHttpResponse => ({ statusCode, body });
