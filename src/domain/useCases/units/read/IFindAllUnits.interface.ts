import { IUnitModel } from "src/domain/models/Unit.model";

export interface IFindAllUnitsUseCase {
  execute(): Promise<IUnitModel[]>;
}
