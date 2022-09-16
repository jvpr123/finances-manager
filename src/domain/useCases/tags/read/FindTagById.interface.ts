import { ITagModel } from "src/domain/models/Tag.model";

export interface IFindTagByIdUseCase {
  execute(id: string): Promise<ITagModel>;
}
