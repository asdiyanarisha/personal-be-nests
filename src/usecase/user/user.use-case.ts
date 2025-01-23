import { Injectable } from '@nestjs/common';
import { User } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../../dtos/user';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserUseCase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userFactory: UserFactoryService,
  ) {}

  async createUser(registerUser: RegisterUserDto): Promise<null> {
    try {
      // call to our dependencies
      // const createdBook = await this.dataServices.books.create(book);
      // await this.crmServices.bookAdded(createdBook);

      const user = this.userFactory.createNewUser(registerUser);

      await this.userRepository.save(user);

      console.log('createdBook', user);

      return null;
    } catch (error) {
      throw error;
    }
  }
}
