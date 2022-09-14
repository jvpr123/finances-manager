import { IUserModel } from "./User.model";

export interface IUnitModel {
  id: string;
  name: string;
  description: string;
  initialBalance: number;
  currentBalance: number;
  createdAt: Date;
  updatedAt: Date;
  owner: IUserModel;
}
