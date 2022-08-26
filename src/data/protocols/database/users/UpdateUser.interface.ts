import { IUserModel } from "src/domain/models/User.model";
import { IUpdateUserInput } from "src/domain/dto/users/UpdateUser.dto";

export interface IUpdateUserRepository {
  update(data: IUpdateUserInput): Promise<Omit<IUserModel, "password">>;
}
