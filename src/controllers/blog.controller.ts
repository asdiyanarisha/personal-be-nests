import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserUseCase } from '../usecase/user';
import { Response } from 'express';
import { loginAuthDto } from '../dtos/auth';

@Controller('api/blog')
export class BlogController {
  constructor(private userUseCase: UserUseCase) {}

  @Post()
  async postBlog(@Res() res: Response) {
    console.log('Enter');

    res.status(200).send({});
    return;
  }
}
