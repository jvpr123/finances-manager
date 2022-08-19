import { IUserModel } from "@domain/models/User.model";
import {
  ICreateUserDto,
  ICreateUserInput,
} from "@domain/dto/users/CreateUser.dto";

export const makeFakeUserDto = (): ICreateUserDto => ({
  name: "valid_name",
  email: "valid_email",
  password: "valid_password",
  phone: "valid_phone",
});

export const makeFakeUserInput = (): ICreateUserInput => ({
  ...makeFakeUserDto(),
  passwordConfirmation: "valid_password",
});

export const makeFakeUser = (): IUserModel => ({
  ...makeFakeUserDto(),
  id: "valid_id",
  createdAt: new Date(2022),
  updatedAt: new Date(2022),
});
