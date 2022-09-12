import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";
import { ICategoryModel } from "src/domain/models/Category.model";

export interface ICreateCategoryUseCase {
  execute(input: ICreateCategoryInput): Promise<ICategoryModel>;
}
