import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";

import { resolveValue } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";

export const makeFindCategoryRepositoryStub = (): IFindCategoryRepository => ({
  findByTitle: resolveValue(makeFakeCategory()),
});
