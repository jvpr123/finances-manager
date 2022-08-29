import { IUnitModel } from "src/domain/models/Unit.model";

export interface IFindUnitsRepository {
  findAll(): Promise<IUnitModel[]>;
  findByName(name: string): Promise<IUnitModel>;
}
