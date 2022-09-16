import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

import { resolveValue } from "src/__tests__/utils/jest/MockReturnValues.factory";

export const makeFindTagsRepositoryStub = (): IFindTagsRepository => ({
  findByTitle: resolveValue(undefined),
});
