import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { BlogUseCase } from '../usecase/blog';
import { Response } from 'express';
import { CreatePostBlog } from '../dtos/blog';
import { BuildResponseUtil } from '../util';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/blog')
export class BlogController {
  constructor(
    private blogUseCase: BlogUseCase,
    private buildResponse: BuildResponseUtil,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
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
