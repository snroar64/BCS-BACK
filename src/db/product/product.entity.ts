import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: Object;

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
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  updatedAt?: Date;
}
