import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
    });
    if (user)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const entity = new User();
    createUserDto.password = await entity.hashpassword(createUserDto.password);
    const newUser = await this.userRepository.save(createUserDto);
    delete newUser.password;
    delete newUser.confirmPassword;
    return newUser;
  }
  async findAll() {
    const users = await this.userRepository.findAndCount();
    return users;
  }

  async findOne(id: number): Promise<User[]> {
    const users = await this.userRepository.find({ where: { id } });
    return users;
  }

  async findByUserName(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async update(id: number, updateUserDto) {
    const user = await this.userRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
    });
    return user;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { userId: id, message: 'User deleted' };
  }
}
