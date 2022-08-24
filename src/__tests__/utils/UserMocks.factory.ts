import { IUserModel } from "src/domain/models/User.model";
import {
  ICreateUserDto,
  ICreateUserInput,
} from "src/domain/dto/users/CreateUser.dto";

export const makeFakeUserDto = (): ICreateUserDto => ({
  name: "valid_name",
  email: "valid@email.com",
  password: "secret123",
  phone: "12345678902",
});

export const makeFakeUserInput = (): ICreateUserInput => ({
  ...makeFakeUserDto(),
  passwordConfirmation: "secret123",
});

export const makeFakeUser = (): IUserModel => ({
  ...makeFakeUserDto(),
  id: "valid_id",
  createdAt: new Date(2022),
  updatedAt: new Date(2022),
});
