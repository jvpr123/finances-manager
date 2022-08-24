import { IUserModel } from "src/domain/models/User.model";

export interface IFindUserRepository {
  findByEmail(email: string): Promise<Omit<IUserModel, "password">>;
}
