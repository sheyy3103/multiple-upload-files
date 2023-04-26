import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { ProductDto } from './dto/product.dto';
import { ImageService } from 'src/image/image.service';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
  ) {}
  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    return await this.productService.getById(id);
  }
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './src/public/uploads',
        filename(req, file, callback) {
          let filename = Date.now() + '-' + file.originalname;
          filename = filename.split(' ').join('_');
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() product: ProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    const createdProduct = await this.productService.create(product);
    images.forEach((element) => {
      element.filename =
        'http://' + req.get('host') + '/uploads' + element.filename;
    });
    const createdImages = await this.imageService.create(
      createdProduct.id,
      images,
    );
    return { createdProduct, createdImages };
  }
}
