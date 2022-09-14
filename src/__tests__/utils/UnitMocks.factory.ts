import { IUnitModel } from "src/domain/models/Unit.model";
import {
  ICreateUnitDto,
  ICreateUnitInput,
} from "src/domain/dto/units/ICreateUnit.dto";
import {
  IUpdateUnitDto,
  IUpdateUnitInput,
} from "src/domain/dto/units/IUpdateUnit.dto";
import { makeFakeUser } from "./UserMocks.factory";

export const makeFakeCreateUnitInput = (): ICreateUnitInput => ({
  ownerId: "owner_id",
  name: "unit_name",
  description: "unit_description",
  initialBalance: 0,
});

export const makeFakeCreateUnitDto = (): ICreateUnitDto => ({
  name: "unit_name",
  description: "unit_description",
  initialBalance: 0,
  currentBalance: 0,
  owner: makeFakeUser(),
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
  return {
    id: "unit_id",
    name: "unit_name",
    description: "unit_description",
    initialBalance: 0,
    currentBalance: 0,
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
    owner: makeFakeUser(),
  };
};
