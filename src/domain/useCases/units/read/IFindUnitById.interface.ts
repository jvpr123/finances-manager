import { IUnitModel } from "src/domain/models/Unit.model";

export interface IFindUnitByIdUseCase {
  execute(id: string): Promise<IUnitModel>;
}
