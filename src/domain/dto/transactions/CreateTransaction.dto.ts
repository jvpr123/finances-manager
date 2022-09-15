import { IUnitModel } from "src/domain/models/Unit.model";
import { ICategoryModel } from "src/domain/models/Category.model";

export interface ICreateTransactionInput {
  unitId: string;
  categoryId: string;
  title: string;
  description?: string;
  value: number;
  transactionDate: Date;
}

export interface ICreateTransactionDto {
  unit: IUnitModel;
  category: ICategoryModel;
  title: string;
  description?: string;
  value: number;
  transactionDate: Date;
}
