/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Librarian } from '../librarian/entities/librarian.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Librarian])],
  controllers:[UserController],
  providers: [UserService],
})
export class UserModule {}
