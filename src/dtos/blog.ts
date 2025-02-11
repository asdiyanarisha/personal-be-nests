import { IsString, IsNotEmpty } from 'class-validator';
import { Tag } from '../entities/tag.entity';

export class CreatePostBlog {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  tags: Tag[];
}
