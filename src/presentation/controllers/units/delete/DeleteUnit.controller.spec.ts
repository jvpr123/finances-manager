import {
  rejectValueOnce,
  resolveValue,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IDeleteUnitUseCase } from "src/domain/useCases/units/delete/DeleteUnit.interface";

import { IController } from "src/presentation/protocols/Controller.interface";
import { IHttpRequest } from "src/presentation/protocols/Http.interface";
import { DeleteUnitController } from "./DeleteUnit.controller";
import {
  internalServerError,
  notFound,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "src/errors/utils/Handler.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeUseCaseStub = (): IDeleteUnitUseCase => ({
  execute: resolveValue(true),
});

const makeSUT = (useCase: IDeleteUnitUseCase): IController =>
  new DeleteUnitController(useCase);

describe("Delete Unit Controller", () => {
  let sut: IController;
  let useCase: IDeleteUnitUseCase;

  const httpRequest: IHttpRequest = { params: { id: "valid_id" } };

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: DeleteUnitUseCase", () => {
    it("should call execute() method from deleteUserUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      (useCase.execute as jest.Mock) = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return an 404 status-code response when unit does not exist", async () => {
      useCase.execute = jest.fn().mockImplementationOnce(() => {
        throw new NotFoundError(
          `Could not delete: data related to ID provided not found`
        );
      });

      const result = await sut.handle(httpRequest);

      expect(result).toEqual(
        notFound("Could not delete: data related to ID provided not found")
      );
    });

    it("should return an 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle({})).resolves.toEqual(internalServerError("error"));
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(ok({ isDeleted: true }));
    });
  });
});
