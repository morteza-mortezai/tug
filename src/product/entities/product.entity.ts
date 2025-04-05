import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Company } from 'src/company/entities/company.entity';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  subCategory: Subcategory;

  @OneToOne(() => Company, (company) => company.product)
  @JoinColumn()
  company: Company;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
