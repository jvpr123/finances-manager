import { IUpdateCategoryInput } from "src/domain/dto/categories/UpdateCategory.dto";
import { ICategoryModel } from "src/domain/models/Category.model";

export interface IUpdateCategoryRepository {
  update(data: IUpdateCategoryInput): Promise<ICategoryModel>;
}
