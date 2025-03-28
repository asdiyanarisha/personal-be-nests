import { IsArray, IsNumber, IsString } from "class-validator";

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
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsArray()
  tags: string[];

  @IsString()
  url_image: string;

  @IsString()
  created_at: string;
}
