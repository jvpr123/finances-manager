import { ICategoryModel } from "src/domain/models/Category.model";

export interface IFindCategoryByIdUseCase {
  execute(id: string): Promise<ICategoryModel>;
}
