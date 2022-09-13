import { ICategoryModel } from "src/domain/models/Category.model";

export interface IFindCategoryRepository {
  findByTitle(title: string): Promise<ICategoryModel>;
  findById(id: string): Promise<ICategoryModel>;
}
