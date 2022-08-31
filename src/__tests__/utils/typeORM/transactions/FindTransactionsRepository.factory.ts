import { resolveValue } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFakeTransaction } from "src/__tests__/utils/TransactionMocks.factory";

import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";

export const makeFindTransactionsRepositoryStub =
  (): IFindTransactionsRepository => ({
    findById: resolveValue(makeFakeTransaction()),
    findAll: resolveValue([makeFakeTransaction()]),
  });
