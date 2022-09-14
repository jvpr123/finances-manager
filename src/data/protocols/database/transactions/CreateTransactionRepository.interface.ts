import { ICreateTransactionDto } from "src/domain/dto/transactions/CreateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface ICreateTransactionRepository {
  create(data: ICreateTransactionDto): Promise<ITransactionModel>;
}
