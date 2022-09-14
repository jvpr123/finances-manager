import { IUserModel } from "./User.model";
import { ITransactionModel } from "src/domain/models/Transaction.model";

export interface IUnitModel {
  id: string;
  name: string;
  description: string;
  initialBalance: number;
  currentBalance: number;

  createdAt: Date;
  updatedAt: Date;

  owner: IUserModel;
  transactions: ITransactionModel[];
}
