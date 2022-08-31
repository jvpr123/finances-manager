import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface IFindTransactionByIdUseCase {
  execute(id: string): Promise<ITransactionModel>;
}
