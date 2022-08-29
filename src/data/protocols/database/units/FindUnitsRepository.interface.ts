import { IUnitModel } from "src/domain/models/Unit.model";

export interface IFindUnitsRepository {
  findAll(): Promise<IUnitModel[]>;
  findById(id: string): Promise<IUnitModel>;
  findByName(name: string): Promise<IUnitModel>;
}
