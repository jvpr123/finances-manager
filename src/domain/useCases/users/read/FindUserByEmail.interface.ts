import { IUserModel } from "src/domain/models/User.model";

export interface IFindUserByEmailUseCase {
  execute(email: string): Promise<Partial<IUserModel>>;
}
