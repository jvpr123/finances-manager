import { ICategoryModel } from "src/domain/models/Category.model";

export interface IFindAllCategoriesUseCase {
  execute(): Promise<ICategoryModel[]>;
}
