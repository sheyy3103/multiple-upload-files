/* eslint-disable prettier/prettier */
import { Image } from 'src/image/entity/image.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'tinyint' })
  status: number;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];
}
