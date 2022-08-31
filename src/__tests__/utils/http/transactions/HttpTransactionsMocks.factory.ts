import { IHttpRequest } from "src/presentation/protocols/Http.interface";
import { makeFakeCreateTransactionDto } from "../../TransactionMocks.factory";

export const makeFakeCreateTransactionRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateTransactionDto() },
});

// export const makeFakeUpdateUserRequest = (): IHttpRequest => ({
//   body: { ...makeFakeUpdateUserInput() },
// });
