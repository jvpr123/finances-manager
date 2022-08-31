import { makeFakeTransaction } from "src/__tests__/utils/TransactionMocks.factory";
import { makeFindTransactionsRepositoryStub } from "src/__tests__/utils/typeORM/transactions/FindTransactionsRepository.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";
import { FindTransactionByIdUseCase } from "./FindTransactionById.usecase";

import { IFindTransactionByIdUseCase } from "src/domain/useCases/transactions/read/FindTransactionById.interface";

import { NotFoundError } from "src/errors/NotFound.error";

describe("Find Transaction By ID UseCase", () => {
  const makeSUT = (
    repository: IFindTransactionsRepository
  ): IFindTransactionByIdUseCase => new FindTransactionByIdUseCase(repository);

  let sut: IFindTransactionByIdUseCase;
  let repository: IFindTransactionsRepository;

  beforeEach(() => {
    repository = makeFindTransactionsRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Transactions Repository", () => {
    it("should call findById() method with correct values", async () => {
      await sut.execute("valid_id");
      expect(repository.findById).toHaveBeenCalledWith("valid_id");
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute("valid_id")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);

      expect(sut.execute("invalid_id")).rejects.toThrow(
        new NotFoundError(
          `Could not find data related to provided transaction ID`
        )
      );
    });

    it("should return an TransactionModel instance when operations succeed", async () => {
      expect(sut.execute("valid_id")).resolves.toEqual(makeFakeTransaction());
    });
  });
});
