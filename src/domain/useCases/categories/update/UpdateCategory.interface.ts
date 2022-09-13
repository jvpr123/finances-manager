import { IUpdateCategoryInput } from "src/domain/dto/categories/UpdateCategory.dto";
import { ICategoryModel } from "src/domain/models/Category.model";

export interface IUpdateCategoryUseCase {
  execute(input: IUpdateCategoryInput): Promise<ICategoryModel>;
}
