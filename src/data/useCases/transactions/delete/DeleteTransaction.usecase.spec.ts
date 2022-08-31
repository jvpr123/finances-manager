import { makeFindTransactionsRepositoryStub } from "src/__tests__/utils/typeORM/transactions/FindTransactionsRepository.factory";
import { makeFakeTransaction } from "src/__tests__/utils/TransactionMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { NotFoundError } from "src/errors/NotFound.error";

import { DeleteTransactionUseCase } from "./DeleteTransaction.usecase";
import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";
import { IDeleteTransactionRepository } from "src/data/protocols/database/transactions/DeleteTransactionRepository.interface";

import { IDeleteUnitUseCase } from "src/domain/useCases/units/delete/DeleteUnit.interface";

type Repository = IFindTransactionsRepository & IDeleteTransactionRepository;
describe("Delete Unit UseCase", () => {
  const transactionData = makeFakeTransaction();
  let sut: IDeleteUnitUseCase;
  let repository: Repository;

  const makeRepositoryStub = (): Repository => ({
    ...makeFindTransactionsRepositoryStub(),
    delete: resolveValue(true),
  });

  const makeSUT = (repository: Repository) =>
    new DeleteTransactionUseCase(repository);

  beforeEach(() => {
    repository = makeRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Transactions Repository", () => {
    it("should call findById() method with correct values", async () => {
      await sut.execute(transactionData.id);
      expect(repository.findById).toHaveBeenCalledWith(transactionData.id);
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute(transactionData.id)).rejects.toThrow(new Error());
    });

    it("should throw a Not Found Error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);

      expect(sut.execute(transactionData.id)).rejects.toEqual(
        new NotFoundError(
          `Could not delete: data related to ID provided not found`
        )
      );
    });

    it("should call delete() with correct values", async () => {
      await sut.execute(transactionData.id);
      expect(repository.delete).toHaveBeenCalledWith(transactionData.id);
    });

    it("should return true when deletion succeeds", async () => {
      expect(sut.execute(transactionData.id)).resolves.toEqual(true);
    });
  });
});
