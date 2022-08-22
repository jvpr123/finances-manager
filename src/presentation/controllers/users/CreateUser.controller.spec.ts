import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import { makeFakeRequest } from "src/__tests__/utils/http/HttpMocks.factory";

import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";
import { IController } from "@presentation/protocols/Controller.interface";
import {
  created,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";

import { CreateUserController } from "./CreateUser.controller";

const makeUseCaseStub = (): ICreateUserUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeUser()),
});

const makeSUT = (useCase: ICreateUserUseCase): IController =>
  new CreateUserController(useCase);

describe("Create User Controller", () => {
  let sut: IController;
  let useCase: ICreateUserUseCase;

  const httpRequest = makeFakeRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
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
