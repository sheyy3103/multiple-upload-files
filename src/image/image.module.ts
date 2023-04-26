import { Module, forwardRef } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/image.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => ProductModule)],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [TypeOrmModule],
})
export class ImageModule {}
