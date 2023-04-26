import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { Image } from 'src/image/entity/image.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['images'] });
  }
  async getById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: [{ id: id }],
      relations: ['images'],
    });
  }
  async create(product: ProductDto): Promise<Product> {
    return await this.productRepository.save(product);
  }
}
