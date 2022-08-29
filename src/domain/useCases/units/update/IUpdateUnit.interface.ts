import { IUnitModel } from "src/domain/models/Unit.model";
import { IUpdateUnitInput } from "src/domain/dto/units/IUpdateUnit.dto";

export interface IUpdateUnitUseCase {
  execute(input: IUpdateUnitInput): Promise<IUnitModel>;
}
