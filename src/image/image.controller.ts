import {
  Controller,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { Image } from './entity/image.entity';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':id')
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
    @Param('id') id: number,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Req() req: Request,
  ): Promise<Image[]> {
    images.forEach((element) => {
      element.filename =
        'http://' + req.get('host') + '/uploads' + element.filename;
    });
    return await this.imageService.create(id, images);
  }
}
