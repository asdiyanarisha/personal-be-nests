import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/user';
import { UserUseCase } from '../usecase/user';
import { Response } from 'express';

@Controller('api/register')
export class RegisterController {
  constructor(private userUseCase: UserUseCase) {}

  @Post()
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    const resp = await this.userUseCase.createUser(registerUserDto);
    if (resp.status != 'success') {
      res.status(400).send(resp);
      return;
    }
    res.status(201).send(resp);
    return;
  }
}
