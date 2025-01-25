import { Injectable } from '@nestjs/common';
import { User } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../../dtos/user';
import * as bcrypt from 'bcrypt';
import { ResponseCommon } from '../../dtos/response';
import { loginAuthDto, ResponseLoginDto } from '../../dtos/auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserUseCase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async login(bodyLogin: loginAuthDto): Promise<any> {
    const prevUser = await this.userRepository.findOne({
      select: {
        id: true,
        role: true,
        password: true,
      },
      where: {
        username: bodyLogin.username,
      },
    });

    if (prevUser == null) {
      return this.createResponse('unauthorized', 'Unauthenticated user');
    }

    const isMatch = await bcrypt.compare(bodyLogin.password, prevUser.password);

    if (!isMatch) {
      return this.createResponse('unauthorized', 'password mismatch');
    }

    const payload = { sub: prevUser.id, role: prevUser.role };

    const token = await this.jwtService.signAsync(payload);

    return this.createResponseToken('success', 'login successfully', token);
  }

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

  createResponseToken(
    status: string,
    message: string,
    token: string,
  ): ResponseCommon {
    const resp = new ResponseLoginDto();
    resp.status = status;
    resp.message = message;
    resp.token = token;

    return resp;
  }
}
