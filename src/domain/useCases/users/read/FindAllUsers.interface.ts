import { IUserModel } from "src/domain/models/User.model";

export interface IFindAllUsersUseCase {
  execute(): Promise<Partial<IUserModel>[]>;
}
