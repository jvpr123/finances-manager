import { IUserModel } from "src/domain/models/User.model";

export interface ICreateUnitInput {
  ownerId: string;
  name: string;
  description: string;
  initialBalance: number;
}

export interface ICreateUnitDto {
  name: string;
  description: string;
  initialBalance: number;
  currentBalance: number;
  owner: IUserModel;
}
