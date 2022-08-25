import { IUserModel } from "src/domain/models/User.model";
import { IUpdateUserDto } from "src/domain/dto/users/UpdateUser.dto";

export interface IUpdateUserRepository {
  update(data: IUpdateUserDto): Promise<Omit<IUserModel, "password">>;
}
