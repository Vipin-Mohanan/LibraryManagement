/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { AdminAuthGuard } from 'src/guard/admin-auth/admin-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('librarian')
@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  @Post('/signup')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Add a new librarian' })
  @ApiResponse({ status: 201, description: 'Add a new librarian' })
  async registerNewLibrarian(@Body() librarianDTO:CreateLibrarianDto)
  {
    await this.librarianService.registerNewLibrarian(librarianDTO); 
  }

}
