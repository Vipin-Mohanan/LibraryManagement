/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Librarian } from '../librarian/entities/librarian.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userrepository: Repository<User>,
    @InjectRepository(Librarian)
    private readonly librarianrepository: Repository<Librarian>,
  ) {}

  async login(authDto: CreateAuthDto) {

 
    const { email, password } = authDto;
    console.log(authDto);
    

  
    const user = await this.userrepository.findOne({ where: { email } });
    console.log('useeeeeeerrr', user);

    if(!user){
      return { message: 'user not exists' };

    }
    if (user && await bcrypt.compare(password, user.password)) {

      
      return {message: 'user logged in successfully'};
    }
   
    return { message: 'invalid user' };
   
  }
}

