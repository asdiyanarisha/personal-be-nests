import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostBlog {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  tags: string;
}
