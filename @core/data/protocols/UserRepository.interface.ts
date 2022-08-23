import { ICreateUserDto } from "@domain/dto/users/CreateUser.dto";
import { IUserModel } from "@domain/models/User.model";

export interface IUserRepository {
  create(data: ICreateUserDto): Promise<Omit<IUserModel, "password">>;
}
