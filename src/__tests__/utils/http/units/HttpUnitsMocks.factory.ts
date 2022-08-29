import { IHttpRequest } from "src/presentation/protocols/Http.interface";

import {
  makeFakeCreateUnitDto,
  makeFakeUpdateUnitInput,
} from "src/__tests__/utils/UnitMocks.factory";

export const makeFakeCreateUnitRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateUnitDto() },
});

export const makeFakeUpdateUnitRequest = (): IHttpRequest => ({
  body: { ...makeFakeUpdateUnitInput() },
});
