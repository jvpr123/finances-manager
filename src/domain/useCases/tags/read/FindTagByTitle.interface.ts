import { ITagModel } from "src/domain/models/Tag.model";

export interface IFindTagByTitleUseCase {
  execute(title: string): Promise<ITagModel>;
}
