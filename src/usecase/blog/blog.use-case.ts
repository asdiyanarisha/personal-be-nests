import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../../entities';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreatePostBlog } from '../../dtos/blog';

@Injectable()
export class BlogUseCase {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private configService: ConfigService,
  ) {}

  async createPost(req: CreatePostBlog): Promise<any> {
    try {
      const blogData = this.blogRepository.create(req);

      blogData.slug = this.createSlug(blogData.title);

      await this.blogRepository.save(blogData);
    } catch (error) {
      throw error;
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
