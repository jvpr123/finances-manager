export interface IUpdateTransactionInput {
  id: string;
  title?: string;
  description?: string;
  value?: number;
  transactionDate?: Date;
}
