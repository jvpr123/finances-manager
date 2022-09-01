import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface IUpdateTransactionRepository {
  update(data: IUpdateTransactionInput): Promise<ITransactionModel>;
}
