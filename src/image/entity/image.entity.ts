/* eslint-disable prettier/prettier */
import { Product } from 'src/product/entity/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
