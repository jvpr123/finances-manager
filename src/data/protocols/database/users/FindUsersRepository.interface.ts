import { IUserModel } from "src/domain/models/User.model";

export interface IFindUsersRepository {
  findAll(): Promise<Omit<IUserModel, "password">[]>;
  findById(id: string): Promise<IUserModel>;
  findByEmail(email: string): Promise<Omit<IUserModel, "password">>;
}
