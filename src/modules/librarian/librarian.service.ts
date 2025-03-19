// Import necessary modules and decorators from NestJS and TypeORM
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

  /**
   * Registers a new librarian in the system.
   *
   * @param librarianDTO - Data Transfer Object containing librarian details.
   * @returns A success message with librarian details or an error if the email already exists.
   */

  async registerNewLibrarian(librarianDTO:CreateLibrarianDto)
  {
    try {
       // Extract relevant fields from the DTO
      const {name, email, password, phone_number, address, role} = librarianDTO;

            // Check if a librarian or user with the given email already exists
        const existingLibrarian = await this.librarianRepository.findOne({where:{email}}) || await this.userRepository.findOne({where:{email}})  ;

        if(existingLibrarian)
        {
          UserAlreadyExistError()
        }

        else{

          // Hash the password for security before storing it
          const hashedPassword =await bcrypt.hash(password, 10);

          // Create a new librarian entity
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

          // Hash the password for security before storing it
          await this.librarianRepository.save(newLibrarian);

          const result = {
            message: 'Librarian created successfully',
            data: newLibrarian
          }

         // Return success message with librarian data
          return result;

        }

      
    } catch (error) {
      // Handle errors and rethrow them
      throw error
    }

    
  }
}
