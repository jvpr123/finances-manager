import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

export const makeFakeCreateTransactionDto = (): ICreateTransactionInput => ({
  title: "transaction_title",
  description: "transaction_description",
  value: 100,
  transactionDate: new Date(2022),
});

// export const makeFakeUpdateTransactionInput = (): IUpdateTransactionInput => ({
//   id: "unit_id",
//   name: "unit_name_update",
//   description: "unit_description_update",
// });

export const makeFakeTransaction = (): ITransactionModel => {
  const data = makeFakeCreateTransactionDto();

  return {
    ...data,
    id: "valid_id",
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
  };
};
