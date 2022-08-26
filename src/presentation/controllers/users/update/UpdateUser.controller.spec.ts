import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import { makeFakeUpdateUserRequest } from "src/__tests__/utils/http//users/HttpUsersMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IController } from "src/presentation/protocols/Controller.interface";
import { IUpdateUserUseCase } from "src/domain/useCases/users/update/UpdateUser.interface";

import {
  ok,
  badRequest,
  notFound,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";
import { UpdateUserController } from "./UpdateUser.controller";

import * as errorHandler from "src/errors/utils/Handler.error";
import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeUseCaseStub = (): IUpdateUserUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeUser()),
});

const makeSUT = (useCase: IUpdateUserUseCase): IController =>
  new UpdateUserController(useCase);

describe("Update User Controller", () => {
  let sut: IController;
  let useCase: IUpdateUserUseCase;

  const httpRequest = makeFakeUpdateUserRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: UpdateUserUseCase", () => {
    it("should call execute() method from updateUserUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.body);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return a 400 status-code response when use-case throws a Validation Error", async () => {
      useCase.execute = rejectValueOnce(new ValidationError([]));
      expect(sut.handle(httpRequest)).resolves.toEqual(badRequest([]));
    });

    it("should return a 404 status-code response when use-case throws a Not Found Error", async () => {
      useCase.execute = rejectValueOnce(
        new NotFoundError(
          `Could not update: data related to ID invalid_id not found`
        )
      );
      expect(sut.handle(httpRequest)).resolves.toEqual(
        notFound(`Could not update: data related to ID invalid_id not found`)
      );
    });

    it("should return a 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(httpRequest)).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        ok({ updated: true, user: makeFakeUser() })
      );
    });
  });
});
