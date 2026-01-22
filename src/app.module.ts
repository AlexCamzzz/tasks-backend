import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/AuthModule';
import { UserModule } from './users/UserModule';
import { TasksModule } from './tasks/TasksModule';
import { PrismaService } from './prisma.service';


@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, TasksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
