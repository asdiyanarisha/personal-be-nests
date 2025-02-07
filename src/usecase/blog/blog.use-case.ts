import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../../entities';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreatePostBlog } from '../../dtos/blog';
import { BuildResponseUtil } from '../../util';

@Injectable()
export class BlogUseCase {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private configService: ConfigService,
    private buildResponse: BuildResponseUtil,
  ) {}

  async createPost(req: CreatePostBlog): Promise<any> {
    try {
      const blogData = this.blogRepository.create(req);

      blogData.slug = this.createSlug(blogData.title);

      await this.blogRepository.save(blogData);

      return this.buildResponse.CreateResponse(
        'success',
        'blog created successfully',
      );
    } catch (error) {
      console.log('Masuk', error);
      return this.buildResponse.CreateResponse(
        'failed',
        'failed created post blog',
      );
    }
  }

  createSlug(title: string): string {
    const text = title.trim().replace(/\s+/g, ' ');
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
