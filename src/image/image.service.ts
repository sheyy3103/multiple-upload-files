import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { Repository } from 'typeorm';
import { Image } from './entity/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async create(
    id: number,
    images: Array<Express.Multer.File>,
  ): Promise<Image[]> {
    const product = await this.productRepository.findOneBy({ id: id });
    let imagesReturn = [];
    images.forEach((element) => {
      const image = { name: element.filename };
      const newImage = this.imageRepository.create({ ...image, product });
      imagesReturn = [...imagesReturn, newImage];
      this.imageRepository.save(newImage);
    });
    return imagesReturn;
  }
}
