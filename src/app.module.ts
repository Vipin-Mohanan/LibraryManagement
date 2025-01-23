/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { LibrarianModule } from './modules/librarian/librarian.module';
import { FinesModule } from './modules/fines/fines.module';
import { PublishersModule } from './modules/publishers/publishers.module';

@Module({
  imports: [UserModule, LibrarianModule, FinesModule, PublishersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
