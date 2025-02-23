import { Injectable } from '@nestjs/common';
import { Blog } from '../../entities';
import { ResBlogBySlug, ResListBlog } from "../../dtos";

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

      posts.push(post);
    });

    return posts;
  }
}
