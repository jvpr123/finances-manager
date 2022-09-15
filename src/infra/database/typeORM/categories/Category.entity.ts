import { ICategoryModel } from "src/domain/models/Category.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "../transactions/Transaction.entity";

@Entity()
export class Category implements ICategoryModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", width: 100, unique: true })
  title: string;

  @Column({ type: "varchar", width: 255 })
  description: string;

  @Column({ type: "varchar", width: 20 })
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
