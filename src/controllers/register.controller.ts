import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/user';

@Controller('api/register')
export class RegisterController {
  constructor() {}

  @Post()
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<null> {
    console.log('registerUser', registerUserDto);
    return null;
  }
}
