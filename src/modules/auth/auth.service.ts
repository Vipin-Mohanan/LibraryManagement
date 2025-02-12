/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Librarian } from '../librarian/entities/librarian.entity';
import * as bcrypt from 'bcryptjs';
import { generateJwtToken } from './jwt.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userrepository: Repository<User>,
    @InjectRepository(Librarian) private readonly librarianrepository: Repository<Librarian>,
  ) {}

  async login(authDto: CreateAuthDto) {

    const { email, password } = authDto;
    
    const user = await this.userrepository.findOne({ where: { email } });

    const librarian = await this.librarianrepository.findOne({where:{email}});
    
    if(!user && !librarian){
      return { message: 'user not exists' };
    }

   if(user!=null)
   {
    if (user && await bcrypt.compare(password, user.password)) {

      const role:string = 'user'
      const jwtToken = await generateJwtToken(user.email, user.user_id, role);
      
      return {
        id:1,
        message: 'user logged in successfully',
        user_id:user.user_id,
        token: jwtToken};
    }
   }

   else{
    if (librarian && await bcrypt.compare(password, librarian.password)) {

      const jwtToken = await generateJwtToken(librarian.email, librarian.librarian_id, librarian.role);
      
      return {
        id:2,
        message: 'librarian logged in successfully',
        librarian_id:librarian.librarian_id,
        token: jwtToken};
    }
   }
   
    return { message: 'invalid user' };
   
  }
}

