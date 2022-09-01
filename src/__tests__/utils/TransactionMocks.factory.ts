import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";
import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

export const makeFakeCreateTransactionDto = (
  value?: number
): ICreateTransactionInput => ({
  title: "transaction_title",
  description: "transaction_description",
  value: value ? value : 100,
  transactionDate: new Date(2022),
});

export const makeFakeUpdateTransactionInput = (
  value?: number
): IUpdateTransactionInput => ({
  id: "unit_id",
  title: "transaction_title",
  description: "transaction_description",
  value: value ? value : 100,
  transactionDate: new Date(2022),
});

export const makeFakeTransaction = (value?: number): ITransactionModel => {
  const data = makeFakeCreateTransactionDto(value && value);

  return {
    ...data,
    id: "valid_id",
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
  };
};
