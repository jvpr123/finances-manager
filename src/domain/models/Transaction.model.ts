import { IUnitModel } from "src/domain/models/Unit.model";

export interface ITransactionModel {
  id: string;
  title: string;
  description?: string;
  value: number;
  transactionDate: Date;

  createdAt: Date;
  updatedAt: Date;

  unit: IUnitModel;
}
