import * as Joi from "joi";
import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";

export const CreateTransactionJoiSchema = Joi.object<
  ICreateTransactionInput,
  true
>({
  unitId: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(255).required(),
  value: Joi.number().min(0).required(),
  transactionDate: Joi.date().required(),
});
