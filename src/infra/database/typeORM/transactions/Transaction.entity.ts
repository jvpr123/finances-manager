import { ITransactionModel } from "src/domain/models/Transaction.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Transaction implements ITransactionModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", width: 100 })
  title: string;

  @Column({ type: "varchar", width: 255 })
  description?: string;

  @Column({ type: "decimal" })
  value: number;

  @Column({ type: "date" })
  transactionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
