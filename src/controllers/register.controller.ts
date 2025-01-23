import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/user';
import { UserUseCase } from '../usecase/user';

@Controller('api/register')
export class RegisterController {
  constructor(private userUseCase: UserUseCase) {}

  @Post()
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<null> {
    await this.userUseCase.createUser(registerUserDto);
    return null;
  }
}
