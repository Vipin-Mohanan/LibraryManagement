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
@Injectable()
export class UserService {


  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){

  }


 async signup(userdto: CreateUserDto) {
    console.log(userdto)
    const {name,email,address,password,confirmPassword,phone_number} =userdto
    
    if(!userdto){
      throw new ForbiddenException('Access denied');  
    }

    else if(password!=confirmPassword){
      throw new ForbiddenException('Password and confirm password must be same');
    }
    else if(password===confirmPassword){ 
      const existingUser = await this.userRepository.findOne({where:{email}})

      if(existingUser){
          throw new ForbiddenException('user already exists')
      }
      else{

        const hashedPassword =await bcrypt.hash(password,10)

        console.log("hash",hashedPassword)

          const newUser = await this.userRepository.create(
            {
              name,
              email,
              password : hashedPassword,
              address,
              phone_number
            }

          )
          await this.userRepository.save(newUser)

      }



    }
   







  }
 
}
