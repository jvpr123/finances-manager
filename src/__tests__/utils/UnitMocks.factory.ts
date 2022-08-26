import { IUnitModel } from "src/domain/models/Unit.model";
import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";

export const makeFakeCreateUnitDto = (): ICreateUnitInput => ({
  name: "unit_name",
  description: "unit_description",
  initialBalance: 0,
});

// export const makeFakeUpdateUserInput = (): IUpdateUserInput => ({
//   id: "valid_id",
//   name: "valid_name",
//   email: "user@email.com",
//   phone: "12345678902",
// });

export const makeFakeUnit = (): IUnitModel => {
  const data = makeFakeCreateUnitDto();

  return {
    ...data,
    id: "valid_id",
    currentBalance: data.initialBalance,
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
  };
};
