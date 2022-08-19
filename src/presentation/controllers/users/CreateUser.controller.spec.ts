import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import { makeFakeRequest } from "src/__tests__/utils/http/HttpMocks.factory";

import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";
import { IController } from "@presentation/protocols/Controller.interface";
import {
  badRequest,
  created,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";

import { CreateUserController } from "./CreateUser.controller";
import { IValidator } from "@presentation/protocols/Validator.interface";

const makeValidatorStub = (): IValidator => ({
  validate: jest.fn().mockReturnValue([]),
});

const makeUseCaseStub = (): ICreateUserUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeUser()),
});

const makeSUT = (
  validator: IValidator,
  useCase: ICreateUserUseCase
): IController => new CreateUserController(validator, useCase);

describe("Create User Controller", () => {
  let sut: IController;
  let validator: IValidator;
  let useCase: ICreateUserUseCase;

  const httpRequest = makeFakeRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    validator = makeValidatorStub();
    sut = makeSUT(validator, useCase);
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.handle(httpRequest);
      expect(validator.validate).toHaveBeenCalledWith(httpRequest.body);
    });

    it("should call execute() method from createUserUseCase when validation succeeds", async () => {
      await sut.handle(makeFakeRequest());
      expect(useCase.execute).toHaveBeenCalledTimes(1);
    });

    it("should not call execute() method from createUserUseCase when validation fails", async () => {
      const mockErrors = [new Error("Error message")];
      validator.validate = jest.fn().mockReturnValueOnce(mockErrors);

      await sut.handle(makeFakeRequest());
      expect(useCase.execute).toHaveBeenCalledTimes(0);
    });

    it("should return an 400 status-code response when use-case throws", async () => {
      const mockErrors = [new Error("Error message")];
      validator.validate = jest.fn().mockReturnValueOnce(mockErrors);

      expect(sut.handle(makeFakeRequest())).resolves.toStrictEqual(
        badRequest(mockErrors)
      );
    });
  });

  describe("Dependency: CreateUserUseCase", () => {
    it("should call execute() method from createUserUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.body);
    });

    it("should return an 500 status-code response when use-case throws", async () => {
      useCase.execute = jest
        .fn()
        .mockRejectedValueOnce(new Error("Error message"));

      expect(sut.handle(makeFakeRequest())).resolves.toEqual(
        internalServerError("Error message")
      );
    });

    it("should return a 201 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(makeFakeRequest())).resolves.toEqual(
        created({ user: makeFakeUser() })
      );
    });
  });
});
