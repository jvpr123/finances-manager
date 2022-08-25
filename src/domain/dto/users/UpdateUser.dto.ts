export interface IUpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface IUpdateUserDto extends Omit<IUpdateUserInput, "id"> {}
