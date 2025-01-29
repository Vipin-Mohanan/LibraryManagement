/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Librarian } from '../librarian/entities/librarian.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Librarian])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
