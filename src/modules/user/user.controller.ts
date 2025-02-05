/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('/signup')
  async signup(@Body() userdto :CreateUserDto){

    console.log("User Data: ", userdto);
    
    return await this.userService.signup(userdto)
  }
  


}
