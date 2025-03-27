import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post, Query,
  Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { BlogUseCase } from '../usecase/blog';
import { Response } from 'express';
import { CreatePostBlog } from '../dtos';
import { BuildResponseUtil } from '../util';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/blog')
export class BlogController {
  constructor(
    private blogUseCase: BlogUseCase,
    private buildResponse: BuildResponseUtil,
  ) {}

  @Get('public/:slug')
  async getPublicPostBySlug(
    @Param() params: any,
    @Res() res: Response,
  ): Promise<void> {
    const slug = params.slug;
    try {
      const response = await this.blogUseCase.getPostBySlug(slug);
      res.status(200).send({ msg: 'success', data: response });
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send({ msg: 'failed' });
        return;
      }

      res.status(500).send({ msg: 'internal server error' });
      return;
    }
  }

  @Get('public')
  async getPublicPost(
    @Param() params: any,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const responses = await this.blogUseCase.getPosts(offset, limit);
      res.status(200).send({ msg: 'success', data: responses });
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send({ msg: 'failed', data: [] });
        return;
      }

      res.status(500).send({ msg: 'internal server error', data: [] });
      return;
    }
  }

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
    const result = await this.blogUseCase.createPost(req, file.filename);
    if (result.status == 'failed') {
      res.status(400).send(result);
      return;
    }

    res.status(201).send(result);

    return;
  }
}
