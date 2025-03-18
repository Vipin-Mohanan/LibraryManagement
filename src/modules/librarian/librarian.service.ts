/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateLibrarianDto} from './dto/create-librarian.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Librarian } from './entities/librarian.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserAlreadyExistError } from 'src/filters/errorMessage';

@Injectable()
export class LibrarianService {
  constructor(@InjectRepository(Librarian) private readonly librarianRepository: Repository<Librarian>, 
              @InjectRepository(User) private readonly userRepository:Repository<User>){}

  async registerNewLibrarian(librarianDTO:CreateLibrarianDto)
  {
    try {
      const {name, email, password, phone_number, address, role} = librarianDTO;

        const existingLibrarian = await this.librarianRepository.findOne({where:{email}}) || await this.userRepository.findOne({where:{email}})  ;

        if(existingLibrarian)
        {
          UserAlreadyExistError()
        }

        else{

          const hashedPassword =await bcrypt.hash(password, 10);

          const newLibrarian = await this.librarianRepository.create(
          {
            name,
            email,
            password:hashedPassword,
            phone_number,
            address,
            role
          }
          )

          await this.librarianRepository.save(newLibrarian);

          const result = {
            message: 'Librarian created successfully',
            data: newLibrarian
          }

          return result;

        }

      
    } catch (error) {
      throw error
    }

    
  }




}
