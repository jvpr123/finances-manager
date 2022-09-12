import { ICategoryModel } from "src/domain/models/Category.model";

export interface IFindCategoryByTitleUseCase {
  execute(title: string): Promise<ICategoryModel>;
}
