import { Injectable } from '@nestjs/common';
import { User } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../../dtos/user';
import * as bcrypt from 'bcrypt';
import { ResponseCommon } from '../../dtos/response';

@Injectable()
export class UserUseCase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(registerUser: RegisterUserDto): Promise<ResponseCommon> {
    try {
      const user = this.userRepository.create(registerUser);
      const prevUser = await this.userRepository.findOne({
        select: {
          id: true,
          role: true,
        },
        where: {
          username: registerUser.username,
          role: registerUser.role,
        },
      });

      if (prevUser === null) {
        const saltOrRounds = 10;
        user.password = await bcrypt.hash(registerUser.password, saltOrRounds);
        await this.userRepository.save(user);
      } else {
        return this.createResponse('failed', 'user already exists');
      }

      return this.createResponse('success', 'user successfully created');
    } catch (error) {
      throw error;
    }
  }

  createResponse(status: string, message: string): ResponseCommon {
    const resp = new ResponseCommon();
    resp.status = status;
    resp.message = message;

    return resp;
  }
}
