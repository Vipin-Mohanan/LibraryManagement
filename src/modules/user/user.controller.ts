/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAuthGuard } from 'src/guard/user-auth/user-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('/signup')
  @UseGuards(UserAuthGuard)
  async signup(@Body() userdto :CreateUserDto){
    
    return await this.userService.signup(userdto)
  }
  
}
