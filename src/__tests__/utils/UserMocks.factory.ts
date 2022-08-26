import { IUserModel } from "src/domain/models/User.model";
import {
  ICreateUserDto,
  ICreateUserInput,
} from "src/domain/dto/users/CreateUser.dto";
import { IUpdateUserInput } from "src/domain/dto/users/UpdateUser.dto";

export const makeFakeUserDto = (): ICreateUserDto => ({
  name: "valid_name",
  email: "user@email.com",
  password: "secret123",
  phone: "12345678902",
});

export const makeFakeCreateUserInput = (): ICreateUserInput => ({
  ...makeFakeUserDto(),
  passwordConfirmation: "secret123",
});

export const makeFakeUpdateUserInput = (): IUpdateUserInput => ({
  id: "valid_id",
  name: "valid_name",
  email: "user@email.com",
  phone: "12345678902",
});

export const makeFakeUser = (): IUserModel => ({
  ...makeFakeUserDto(),
  id: "valid_id",
  createdAt: new Date(2022),
  updatedAt: new Date(2022),
});
