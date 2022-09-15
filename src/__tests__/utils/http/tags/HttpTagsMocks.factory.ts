import { IHttpRequest } from "src/presentation/protocols/Http.interface";

import { makeFakeCreateTagInput } from "../../TagMocks.factory";

export const makeFakeCreateTagRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateTagInput() },
});

// export const makeFakeUpdateTagRequest = (): IHttpRequest => ({
//   body: { ...makeFakeUpdateTagInput() },
// });
