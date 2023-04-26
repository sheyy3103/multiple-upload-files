import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ImageModule } from 'src/image/image.module';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => ImageModule)],
  controllers: [ProductController],
  providers: [ProductService, ImageService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
