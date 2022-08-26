import { IUnitModel } from "src/domain/models/Unit.model";

export interface ICreateUnitUseCase {
  execute(data: any): Promise<IUnitModel>;
}
