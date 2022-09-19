import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";
import {
  ICreateTransactionDto,
  ICreateTransactionInput,
} from "src/domain/dto/transactions/CreateTransaction.dto";

import { makeFakeUnit } from "./UnitMocks.factory";
import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import { makeFakeTag } from "./TagMocks.factory";

export const makeFakeCreateTransactionInput = (
  value?: number
): ICreateTransactionInput => ({
  unitId: "unit_id",
  categoryId: "category_id",
  tagsId: ["tag_id"],

  title: "transaction_title",
  description: "transaction_description",
  value: value ? value : 100,
  transactionDate: new Date(2022),
});

export const makeFakeCreateTransactionDto = (
  value?: number
): ICreateTransactionDto => ({
  unit: makeFakeUnit(),
  category: makeFakeCategory(),
  tags: [makeFakeTag()],

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
