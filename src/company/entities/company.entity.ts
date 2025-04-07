import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Company extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Product, (product) => product.companies, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
