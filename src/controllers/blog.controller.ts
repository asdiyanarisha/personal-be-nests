import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogUseCase } from '../usecase/blog';
import { Response } from 'express';
import { CreatePostBlog } from '../dtos';
import { BuildResponseUtil, MulterOptions } from '../util';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/blog')
export class BlogController {
  private readonly logger = new Logger(BlogController.name);

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

  @Get('/post/:id')
  async getBlogById(@Param() params: any, @Res() res: Response): Promise<void> {
    const blogId = params.id;
    if (blogId === undefined) {
      res.status(404).send({ msg: 'parameter blog id not found' });
      return;
    }

    try {
      const response = await this.blogUseCase.getPostById(blogId);
      res.status(200).send({ msg: 'success', data: response });
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send({ msg: 'failed', data: error.getResponse() });
        return;
      }

      res.status(500).send({ msg: 'internal server error' });
      return;
    }
  }

  @Put('/post/:id')
  @UseInterceptors(FileInterceptor('file', MulterOptions))
  async editBlogById(
    @Body() req: CreatePostBlog,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    if (id === undefined) {
      res.status(404).send({ msg: 'parameter blog id not found' });
      return;
    }

    try {
      await this.blogUseCase.editPostById(id, req);
      
      this.logger.log(`Successfully edited blog post with ID: ${id}`);
      
      res.status(200).send({ msg: 'success' });
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send({ msg: 'failed', data: error.getResponse() });
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
  @UseInterceptors(FileInterceptor('file', MulterOptions))
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
