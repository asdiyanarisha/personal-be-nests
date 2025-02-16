import { Injectable } from '@nestjs/common';
import { Blog } from '../../entities';
import { ResBlogBySlug } from '../../dtos';

@Injectable()
export class BlogFactoryService {
  formatBlogSlug(blog: Blog): ResBlogBySlug {
    const response = new ResBlogBySlug();
    response.title = blog.title;
    response.content = blog.content;
    response.url_image = 'storage/' + blog.url_image;
    response.tags = blog.tags.map((u) => u.name);
    response.created_at = blog.createdAt.toUTCString();

    return response;
  }
}
