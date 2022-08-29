import { IUnitModel } from "src/domain/models/Unit.model";
import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";
import {
  IUpdateUnitDto,
  IUpdateUnitInput,
} from "src/domain/dto/units/IUpdateUnit.dto";

export const makeFakeCreateUnitDto = (): ICreateUnitInput => ({
  name: "unit_name",
  description: "unit_description",
  initialBalance: 0,
});

export const makeFakeUpdateUnitInput = (): IUpdateUnitInput => ({
  id: "unit_id",
  name: "unit_name_update",
  description: "unit_description_update",
});

export const makeFakeUpdateUnitDto = (): IUpdateUnitDto => ({
  name: "unit_name_update",
  description: "unit_description_update",
});

export const makeFakeUnit = (): IUnitModel => {
  const data = makeFakeCreateUnitDto();

  return {
    ...data,
    id: "valid_id",
    currentBalance: data.initialBalance,
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
  };
};
