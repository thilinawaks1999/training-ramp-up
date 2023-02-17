import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto): Promise<UserEntity> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (findUser) {
        throw new HttpException('User already exists', 400);
      }
      const hash = await bcrypt.hash(user.password, 10);
      const newUser = await this.userRepository.save({
        ...user,
        password: hash,
      });
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
