import { IUpdateTagInput } from "src/domain/dto/tags/UpdateTag.dto";
import { ITagModel } from "src/domain/models/Tag.model";

export interface IUpdateTagRepository {
  update(data: IUpdateTagInput): Promise<ITagModel>;
}
