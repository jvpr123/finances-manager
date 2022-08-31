import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface IFindAllTransactionsUseCase {
  execute(): Promise<ITransactionModel[]>;
}
