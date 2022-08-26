import { ICreateUserDto } from "src/domain/dto/users/CreateUser.dto";
import { IUserModel } from "src/domain/models/User.model";

export interface ICreateUserRepository {
  create(data: ICreateUserDto): Promise<Omit<IUserModel, "password">>;
}
