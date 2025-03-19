/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Handles user signup by creating a new user in the system.
 * @param {CreateUserDto} userdto - The user data transfer object containing user details.
 * @returns {Promise<any>} The created user data or an appropriate response.
 * @throws {BadRequestException} If the user data is invalid.
 * @example
 * ```json
 * {
 *   "username": "john",
 *   "email": "john@example.com",
 *   "password": "password"
 * }
 * ```
 */
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() userdto: CreateUserDto) {
    return await this.userService.signup(userdto);
  }
}
