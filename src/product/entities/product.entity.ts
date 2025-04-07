import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Company } from 'src/company/entities/company.entity';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  barcode: string;

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

  @OneToMany(() => Company, (company) => company.product)
  companies: Company[];

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
