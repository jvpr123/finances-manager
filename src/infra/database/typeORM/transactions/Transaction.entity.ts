import { ITransactionModel } from "src/domain/models/Transaction.model";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "../categories/Category.entity";

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

  @ManyToOne(() => Unit, (unit) => unit.transactions)
  unit: Unit;

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;
}
