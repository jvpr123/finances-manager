import { IHttpRequest } from "src/presentation/protocols/Http.interface";
import {
  makeFakeCreateUserInput,
  makeFakeUpdateUserInput,
} from "src/__tests__/utils/UserMocks.factory";

export const makeFakeCreateUserRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateUserInput() },
});

export const makeFakeUpdateUserRequest = (): IHttpRequest => ({
  body: { ...makeFakeUpdateUserInput() },
});
