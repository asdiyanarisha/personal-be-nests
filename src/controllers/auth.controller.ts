import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserUseCase } from '../usecase/user';
import { Response } from 'express';
import { loginAuthDto } from '../dtos/auth';

@Controller('api/login')
export class AuthController {
  constructor(private userUseCase: UserUseCase) {}

  @Post()
  async login(@Body() loginDto: loginAuthDto, @Res() res: Response) {
    const resp = await this.userUseCase.login(loginDto);
    if (resp.status == 'unauthorized') {
      res.status(401).send(resp);
      return;
    } else if (resp.status == 'failed') {
      res.status(400).send(resp);
      return;
    }

    res.status(200).send(resp);
    return;
  }
}
