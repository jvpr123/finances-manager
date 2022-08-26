import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IDeleteUserUseCase } from "src/domain/useCases/users/delete/DeleteUser.interface";

import { IController } from "src/presentation/protocols/Controller.interface";
import { IHttpRequest } from "src/presentation/protocols/Http.interface";
import { DeleteUserController } from "./DeleteUser.controller";
import {
  internalServerError,
  notFound,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "src/errors/utils/Handler.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeUseCaseStub = (): IDeleteUserUseCase => ({
  execute: jest.fn().mockResolvedValue(true),
});

const makeSUT = (useCase: IDeleteUserUseCase): IController =>
  new DeleteUserController(useCase);

describe("Delete User Controller", () => {
  let sut: IController;
  let useCase: IDeleteUserUseCase;

  const httpRequest: IHttpRequest = { params: { id: "valid_id" } };

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: DeleteUserUseCase", () => {
    it("should call execute() method from deleteUserUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return an 404 status-code response when user does not exist", async () => {
      const error = new NotFoundError(
        `Could not delete: data related to ID ${httpRequest.params.id} not found`
      );

      useCase.execute = rejectValueOnce(error);
      expect(sut.handle({})).resolves.toEqual(
        notFound(
          `Could not delete: data related to ID ${httpRequest.params.id} not found`
        )
      );
    });

    it("should return an 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle({})).resolves.toEqual(internalServerError("error"));
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle({})).resolves.toEqual(ok({ isDeleted: true }));
    });
  });
});
