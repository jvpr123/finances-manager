import { IUnitModel } from "src/domain/models/Unit.model";
import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";

export interface ICreateUnitRepository {
  create(data: ICreateUnitInput): Promise<IUnitModel>;
}
