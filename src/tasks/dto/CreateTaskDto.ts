// src/tasks/dto/create-task.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  category?: string;
}