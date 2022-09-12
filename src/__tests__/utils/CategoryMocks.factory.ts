import { ICategoryModel } from "src/domain/models/Category.model";
import { ICreateCategoryInput } from "../../domain/dto/categories/CreateCategory.dto";

export const makeFakeCreateCategoryInput = (): ICreateCategoryInput => ({
  title: "category_title",
  description: "category_description",
  color: "#000000",
});

export const makeFakeCategory = (): ICategoryModel => {
  const data = makeFakeCreateCategoryInput();

  return {
    id: "category_id",
    ...data,
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
  };
};
