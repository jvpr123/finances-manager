import { ITransactionModel } from "./Transaction.model";

export interface ITagModel {
  id: string;
  title: string;
  description: string;
  color: string;

  createdAt: Date;
  updatedAt: Date;

  transactions?: ITransactionModel[];
}
