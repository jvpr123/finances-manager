import { makeFakeTransaction } from "src/__tests__/utils/TransactionMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindTransactionByIdUseCase } from "src/domain/useCases/transactions/read/FindTransactionById.interface";

import {
  internalServerError,
  notFound,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { FindTransactionByIdController } from "./FindTRansactionById.controller";

import * as errorHandler from "src/errors/utils/Handler.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeUseCaseStub = (): IFindTransactionByIdUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeTransaction()),
});

const makeSUT = (useCase: IFindTransactionByIdUseCase): IController =>
  new FindTransactionByIdController(useCase);

describe("Find Transaction By ID Controller", () => {
  let sut: IController;
  let useCase: IFindTransactionByIdUseCase;

  const httpRequest = { params: { id: "valid_id" } };

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindTransactionByIdUseCase", () => {
    it("should call execute() method with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return a 404 status-code response when use-case throws a Not Found Error", async () => {
      useCase.execute = rejectValueOnce(new NotFoundError("Not found"));
      expect(sut.handle(httpRequest)).resolves.toEqual(notFound("Not found"));
    });

    it("should return a 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(httpRequest)).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        ok({ transaction: makeFakeTransaction() })
      );
    });
  });
});
