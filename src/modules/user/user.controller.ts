/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('/signup')
  async signup(@Body() userdto :CreateUserDto){
    return await this.userService.signup(userdto)
  }
  
}
