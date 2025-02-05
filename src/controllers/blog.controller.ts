import { Body, Controller, Post, Res } from '@nestjs/common';
import { BlogUseCase } from '../usecase/blog';
import { Response } from 'express';
import { CreatePostBlog } from '../dtos/blog';

@Controller('api/blog')
export class BlogController {
  constructor(private blogUseCase: BlogUseCase) {}

  @Post()
  async createPostBlog(@Body() req: CreatePostBlog, @Res() res: Response) {
    const result = this.blogUseCase.createPost(req);

    res.status(201).send(result);
    return;
  }
}
