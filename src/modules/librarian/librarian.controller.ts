/* eslint-disable prettier/prettier */
import { Body, Controller, Post} from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';


@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  @Post('/signup')
  async registerNewLibrarian(@Body() librarianDTO:CreateLibrarianDto)
  {
    await this.librarianService.registerNewLibrarian(librarianDTO); 
    
    return {message: 'Librarian created successfully'};
  }

}
