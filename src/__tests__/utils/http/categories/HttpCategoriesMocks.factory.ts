import { IHttpRequest } from "src/presentation/protocols/Http.interface";

import {
  makeFakeCreateCategoryInput,
  makeFakeUpdateCategoryInput,
} from "../../CategoryMocks.factory";

export const makeFakeCreateCategoryRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateCategoryInput() },
});

export const makeFakeUpdateCategoryRequest = (): IHttpRequest => ({
  body: { ...makeFakeUpdateCategoryInput() },
});
