/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Librarian } from '../librarian/entities/librarian.entity';
import { UserMiddleware } from 'src/middleware/user/user.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([User, Librarian])],
  controllers:[UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware)
    .forRoutes(UserController);
  }
}
