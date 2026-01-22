// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TasksService } from './TasksService';
import { TasksController } from './TasksController';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TasksService, PrismaService],
  controllers: [TasksController],
})
export class TasksModule {}