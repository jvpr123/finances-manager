import { IUnitModel } from "src/domain/models/Unit.model";

export interface IFindUnitByNameUseCase {
  execute(name: string): Promise<IUnitModel>;
}
