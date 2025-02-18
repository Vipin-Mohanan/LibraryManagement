/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcryptjs';
import { log } from 'console';
import { librarianRole } from '../librarian/dto/create-librarian.dto';
import { Librarian } from '../librarian/entities/librarian.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Librarian)
    private readonly librarianRepository: Repository<Librarian>,
  ) {}

  async signup(userdto: CreateUserDto) {

    if (!userdto) {
      throw new ForbiddenException('User dto is empty');
    }
    const { name, email, address, password, confirmPassword, phone_number } =
      userdto;

      console.log("User:", userdto);
      
    const existingUser =
      (await this.userRepository.findOne({ where: { email } })) ||
      (await this.librarianRepository.findOne({ where: { email } }));

    if (existingUser) {
      throw new ForbiddenException('user already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('hash', hashedPassword);

      const newUser = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        address,
        phone_number,
      });
      await this.userRepository.save(newUser);
      return newUser;
    }
  }
}
