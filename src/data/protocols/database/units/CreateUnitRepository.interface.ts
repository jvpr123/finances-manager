import { IUnitModel } from "src/domain/models/Unit.model";
import { ICreateUnitDto } from "src/domain/dto/units/ICreateUnit.dto";

export interface ICreateUnitRepository {
  create(data: ICreateUnitDto): Promise<IUnitModel>;
}
