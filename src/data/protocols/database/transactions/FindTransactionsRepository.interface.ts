import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface IFindTransactionsRepository {
  findById(id: string): Promise<ITransactionModel>;
}
