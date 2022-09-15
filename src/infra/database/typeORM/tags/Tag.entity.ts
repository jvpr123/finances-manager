import { ITagModel } from "src/domain/models/Tag.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  // ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Tag implements ITagModel {
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

  // @ManyToMany(() => Transaction, (transaction) => transaction.tags)
  // transactions: Transaction[];
}
