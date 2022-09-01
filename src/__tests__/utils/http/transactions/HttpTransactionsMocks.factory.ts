import { IHttpRequest } from "src/presentation/protocols/Http.interface";
import {
  makeFakeCreateTransactionDto,
  makeFakeUpdateTransactionInput,
} from "../../TransactionMocks.factory";

export const makeFakeCreateTransactionRequest = (): IHttpRequest => ({
  body: { ...makeFakeCreateTransactionDto() },
});

export const makeFakeUpdateTransactionRequest = (): IHttpRequest => ({
  body: { ...makeFakeUpdateTransactionInput() },
});
