import { resolveValue } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";

import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";

export const makeFindUnitsRepositoryStub = (): IFindUnitsRepository => ({
  findByName: resolveValue(makeFakeUnit()),
  findById: resolveValue(makeFakeUnit()),
  findAll: resolveValue([makeFakeUnit()]),
});
