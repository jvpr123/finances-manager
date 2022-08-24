export interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
}

export interface ICreateUserDto
  extends Omit<ICreateUserInput, "passwordConfirmation"> {}
