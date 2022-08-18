import { IUserModel } from "@domain/models/User.model";
import { ICreateUserDto } from "@domain/dto/users/CreateUser.dto";

export interface ICreateUserUseCase {
  execute(createUserDto: ICreateUserDto): Promise<IUserModel>;
}
