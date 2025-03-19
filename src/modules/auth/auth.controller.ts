/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 201, description: 'User logined successfully' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

}
