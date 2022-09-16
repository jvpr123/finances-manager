import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

import { resolveValue } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFakeTag } from "src/__tests__/utils/TagMocks.factory";

export const makeFindTagsRepositoryStub = (): IFindTagsRepository => ({
  findByTitle: resolveValue(undefined),
  findById: resolveValue(makeFakeTag()),
});
