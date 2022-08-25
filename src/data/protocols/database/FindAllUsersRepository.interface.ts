import { IUserModel } from "src/domain/models/User.model";

export interface IFindAllUsersRepository {
  findAll(): Promise<Omit<IUserModel, "password">[]>;
}
