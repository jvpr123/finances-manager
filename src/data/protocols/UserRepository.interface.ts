import { ICreateUserDto } from "src/domain/dto/users/CreateUser.dto";
import { IUserModel } from "src/domain/models/User.model";

export interface IUserRepository {
  create(data: ICreateUserDto): Promise<Omit<IUserModel, "password">>;
}
