import { Injectable } from '@nestjs/common';
import { Blog } from '../../entities';
import { ResBlogBySlug, ResListBlog } from '../../dtos';

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

  formatBlogs(blogs: Blog[]): ResListBlog[] {
    const posts: ResListBlog[] = [];

    blogs.forEach((blog) => {
      const post = new ResListBlog();
      post.title = blog.title;
      post.url_image = 'storage/' + blog.url_image;
      post.tags = blog.tags.map((u) => u.name);
      post.created_at = blog.createdAt.toUTCString();
      post.slug = blog.slug;
      post.description = this.buildDescription(blog.content);

      posts.push(post);
    });

    return posts;
  }

  buildDescription(content: string): string {
    try {
      const re = new RegExp('<img[\\s\\S]*?>|<.*?>', 'g');
      const result = content.replaceAll(re, ' ');

      const reWs = new RegExp('\\s\\s', 'g');
      const resultWs = result.replaceAll(reWs, '');

      return resultWs.slice(0, 100).trim();
    } catch (e) {
      console.error('error', e);
      return '';
    }
  }
}
