import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id?: Object;

  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  name: string;

  @Column('decimal')
  rateInterest: number;

  @Column('decimal')
  minimumAmount: number;

  @Column('decimal', { nullable: true })
  maximumAmount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamptz',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamptz',
  })
  updatedAt?: Date;
}
