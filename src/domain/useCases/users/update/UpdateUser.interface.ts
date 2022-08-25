import { IUserModel } from "src/domain/models/User.model";

export interface IUpdateUserUseCase {
  execute(data: any): Promise<Partial<IUserModel>>;
}
