import { makeFakeTransaction } from "src/__tests__/utils/TransactionMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFindTransactionsRepositoryStub } from "src/__tests__/utils/typeORM/transactions/FindTransactionsRepository.factory";

import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";
import { FindAllTransactionsUseCase } from "./FindAllTransactions.usecase";

import { IFindAllTransactionsUseCase } from "src/domain/useCases/transactions/read/FindAllTransactions.interface";

describe("Find All Transactions UseCase", () => {
  const makeSUT = (
    repository: IFindTransactionsRepository
  ): IFindAllTransactionsUseCase => new FindAllTransactionsUseCase(repository);

  let sut: IFindAllTransactionsUseCase;
  let repository: IFindTransactionsRepository;

  beforeEach(() => {
    repository = makeFindTransactionsRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Transactions Repository", () => {
    it("should call findAll() method with correct values", async () => {
      await sut.execute();
      expect(repository.findAll).toHaveBeenCalledWith();
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when repository throws", async () => {
      repository.findAll = rejectValueOnce(new Error());
      expect(sut.execute()).rejects.toThrow(new Error());
    });

    it("should return an array with TransactionModel instances when operations succeed", async () => {
      expect(sut.execute()).resolves.toEqual([makeFakeTransaction()]);
    });
  });
});
