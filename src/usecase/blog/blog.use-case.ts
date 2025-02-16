import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog, Tag } from '../../entities';
import { DataSource, Repository } from 'typeorm';
import { CreatePostBlog } from '../../dtos/blog';
import { BuildResponseUtil } from '../../util';
import { ResBlogBySlug } from "../../dtos";
import { BlogFactoryService } from "./blog-factory.service";

@Injectable()
export class BlogUseCase {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private buildResponse: BuildResponseUtil,
    private factory: BlogFactoryService,
  ) {}

  async getPostBySlug(slug: string): Promise<ResBlogBySlug | null> {
    const blog = await this.blogRepository.findOne({
      where: { slug: slug },
      relations: {
        tags: true,
      },
    });

    if (blog == undefined) {
      throw new NotFoundException();
    }

    return this.factory.formatBlogSlug(blog);
  }

  async createPost(req: CreatePostBlog, filename: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const blogData = new Blog();
      blogData.title = req.title;
      blogData.content = req.content;
      blogData.slug = this.createSlug(blogData.title);
      blogData.url_image = filename;

      const savedBlog = await queryRunner.manager.save(blogData);
      const tags: Tag[] = [];

      for (const tagStr of req.tags.split(',')) {
        let tag = await queryRunner.manager.findOne(Tag, {
          where: { name: tagStr },
        });

        if (!tag) {
          tag = new Tag();
          tag.name = tagStr;
          tag = await queryRunner.manager.save(Tag, tag);
        }

        tags.push(tag);
      }

      savedBlog.tags = tags;
      await queryRunner.manager.save(savedBlog);

      // Commit transaction
      await queryRunner.commitTransaction();

      return this.buildResponse.CreateResponse(
        'success',
        'blog created successfully',
      );
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      return this.buildResponse.CreateResponse(
        'failed',
        'failed created post blog',
      );
    } finally {
      // Release query runner
      await queryRunner.release();
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
