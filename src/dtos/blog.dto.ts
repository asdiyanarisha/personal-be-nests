import { IsArray, IsString } from 'class-validator';

export class ResBlogBySlug {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  tags: string[];

  @IsString()
  url_image: string;

  @IsString()
  created_at: string;
}

export class ResListBlog {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsArray()
  tags: string[];

  @IsString()
  url_image: string;

  @IsString()
  created_at: string;
}
