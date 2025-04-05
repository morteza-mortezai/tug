import { Entity, Column, DeleteDateColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Company extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @OneToOne(() => Product, (product) => product.company, { cascade: true })
  product: Product;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
