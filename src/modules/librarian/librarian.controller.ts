// Import necessary decorators and modules from NestJS
import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { AdminAuthGuard } from 'src/guard/admin-auth/admin-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('librarian')
@ApiBearerAuth()
@Controller('librarian')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  /**
   * Endpoint to register a new librarian.
   * This route is protected and can only be accessed by an admin.
   *
   * @param librarianDTO - Data Transfer Object containing librarian details.
   */

  @Post('/signup')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Add a new librarian' })
  @ApiResponse({ status: 201, description: 'Librarian successfully added' })
  async registerNewLibrarian(@Body() librarianDTO:CreateLibrarianDto)
  {
    // Calls the service method to register a new librarian.
    await this.librarianService.registerNewLibrarian(librarianDTO); 
  }

}
