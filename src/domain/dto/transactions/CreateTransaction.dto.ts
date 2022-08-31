export interface ICreateTransactionInput {
  title: string;
  description?: string;
  value: number;
  transactionDate: Date;
}
