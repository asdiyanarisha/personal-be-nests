import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { BlogUseCase } from '../usecase/blog';
import { Response } from 'express';
import { CreatePostBlog } from '../dtos/blog';
import { BuildResponseUtil } from '../util';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/blog')
export class BlogController {
  constructor(
    private blogUseCase: BlogUseCase,
    private buildResponse: BuildResponseUtil,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb) {
          const originalNameSplit = file.originalname.split('.');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              originalNameSplit[originalNameSplit.length - 1],
          );
        },
      }),
    }),
  )
  async createPostBlog(
    @Body() req: CreatePostBlog,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const result = await this.blogUseCase.createPost(req);
    if (result.status == 'failed') {
      res.status(400).send(result);
      return;
    }

    console.log(file);

    res.status(201).send(result);

    return;
  }
}
