import { IUpdateUnitInput } from "src/domain/dto/units/IUpdateUnit.dto";
import { IUnitModel } from "src/domain/models/Unit.model";

export interface IUpdateUnitRepository {
  update(data: IUpdateUnitInput): Promise<IUnitModel>;
}
