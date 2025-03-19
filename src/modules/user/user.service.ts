import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcryptjs';
import { Librarian } from '../librarian/entities/librarian.entity';
import { UserAlreadyExistError } from 'src/filters/errorMessage';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Librarian)
    private readonly librarianRepository: Repository<Librarian>,
  ) {}

  async signup(userdto: CreateUserDto) {

    const { name, email, address, password, phone_number } =userdto;

      console.log("User:", userdto);
      
    const existingUser =
      (await this.userRepository.findOne({ where: { email } })) ||
      (await this.librarianRepository.findOne({ where: { email } }));

    if (existingUser) {
      UserAlreadyExistError()
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
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
