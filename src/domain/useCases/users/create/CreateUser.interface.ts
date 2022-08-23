import { IUserModel } from "src/domain/models/User.model";

export interface ICreateUserUseCase {
  execute(data: any): Promise<Partial<IUserModel>>;
}
