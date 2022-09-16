import { ITagModel } from "src/domain/models/Tag.model";

export interface IFindAllTagsUseCase {
  execute(): Promise<ITagModel[]>;
}
