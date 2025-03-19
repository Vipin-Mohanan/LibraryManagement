import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login requests.
   * @param createAuthDto - The data transfer object containing login credentials (e.g., email, password).
   * @returns The authentication response, typically including a JWT token if credentials are valid.
   */
  @Post('/login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 201, description: 'User logined successfully' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

}
