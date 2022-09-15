import { ITransactionModel } from "./Transaction.model";

export interface ICategoryModel {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;

  transactions: ITransactionModel[];
}
