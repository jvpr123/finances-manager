import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface ICreateTransactionUseCase {
  execute(input: ICreateTransactionInput): Promise<ITransactionModel>;
}
