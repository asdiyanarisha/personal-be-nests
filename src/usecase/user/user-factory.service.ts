import { Injectable } from '@nestjs/common';
import { User } from '../../entities';
import { RegisterUserDto } from 'src/dtos/user';

@Injectable()
export class UserFactoryService {
  createNewUser(registerUserDto: RegisterUserDto) {
    const newUser = new User();
    newUser.username = registerUserDto.username;
    newUser.password = registerUserDto.password;
    newUser.role = registerUserDto.role;
    newUser.createdAt = new Date();

    return newUser;
  }
}
