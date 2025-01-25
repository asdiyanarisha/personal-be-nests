import { Injectable } from '@nestjs/common';
import { User } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../../dtos/user';

@Injectable()
export class UserUseCase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(registerUser: RegisterUserDto): Promise<null> {
    try {
      const user = this.userRepository.create(registerUser);

      await this.userRepository.save(user);

      return null;
    } catch (error) {
      throw error;
    }
  }
}
