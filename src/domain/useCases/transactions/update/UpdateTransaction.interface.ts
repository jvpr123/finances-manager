import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface IUpdateTransactionUseCase {
  execute(input: IUpdateTransactionInput): Promise<ITransactionModel>;
}
