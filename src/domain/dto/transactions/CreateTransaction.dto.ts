import { IUnitModel } from "src/domain/models/Unit.model";

export interface ICreateTransactionInput {
  unitId: string;
  title: string;
  description?: string;
  value: number;
  transactionDate: Date;
}

export interface ICreateTransactionDto {
  unit: IUnitModel;
  title: string;
  description?: string;
  value: number;
  transactionDate: Date;
}
