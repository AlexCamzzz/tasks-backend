// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './TasksService';
import { JwtAuthGuard } from '../common/guards/JwtAuthGuard';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { FilterTasksDto } from './dto/FilterTasksDto';
import { User } from '../common/decorators/userDecorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@User('id') userId: number, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(userId, createTaskDto);
  }

  @Get()
  findAll(@User('id') userId: number, @Query() filterDto: FilterTasksDto) {
    return this.tasksService.findAll(userId, filterDto);
  }

  @Put(':id')
  update(
    @User('id') userId: number,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(+id, userId, updateTaskDto);
  }

  @Delete(':id')
  remove(@User('id') userId: number, @Param('id') id: string) {
    return this.tasksService.remove(+id, userId);
  }

  @Patch(':id/complete')
  complete(@User('id') userId: number, @Param('id') id: string) {
    return this.tasksService.complete(+id, userId);
  }
}