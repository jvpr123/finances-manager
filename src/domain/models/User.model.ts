import { IUnitModel } from "src/domain/models/Unit.model";

export interface IUserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  units?: IUnitModel[];
}
