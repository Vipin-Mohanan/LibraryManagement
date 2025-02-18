/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { AdminAuthGuard } from 'src/guard/admin-auth/admin-auth.guard';



@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  @Post('/signup')
  @UseGuards(AdminAuthGuard)
  async registerNewLibrarian(@Body() librarianDTO:CreateLibrarianDto)
  {
    await this.librarianService.registerNewLibrarian(librarianDTO); 
    
    return {message: 'Librarian created successfully'};
  }

}
