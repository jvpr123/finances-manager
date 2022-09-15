import { ICategoryModel } from "src/domain/models/Category.model";
import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";
import { IUpdateCategoryInput } from "src/domain/dto/categories/UpdateCategory.dto";

export const makeFakeCreateCategoryInput = (): ICreateCategoryInput => ({
  title: "category_title",
  description: "category_description",
  color: "#000000",
});

export const makeFakeUpdateCategoryInput = (): IUpdateCategoryInput => ({
  id: "category_id",
  title: "new_category_title",
  description: "new_category_description",
  color: "#222222",
});

export const makeFakeCategory = (): ICategoryModel => {
  const data = makeFakeCreateCategoryInput();

  return {
    id: "category_id",
    ...data,
    createdAt: new Date(2022),
    updatedAt: new Date(2022),
    transactions: [],
  };
};
