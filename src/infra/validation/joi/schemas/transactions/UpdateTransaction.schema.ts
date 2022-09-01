import * as Joi from "joi";
import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";

export const UpdateTransactionJoiSchema = Joi.object<
  IUpdateTransactionInput,
  true
>({
  id: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(5).max(255).optional(),
  value: Joi.number().min(0).optional(),
  transactionDate: Joi.date().optional(),
});
