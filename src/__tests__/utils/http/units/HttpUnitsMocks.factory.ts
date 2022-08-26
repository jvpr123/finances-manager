import { IHttpRequest } from "src/presentation/protocols/Http.interface";

import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";

export const makeFakeCreateUnitRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateUnitDto() },
});

// export const makeFakeUpdateUserRequest = (): IHttpRequest => ({
//   body: { ...makeFakeUpdateUserInput() },
// });
