// src/tasks/dto/filter-tasks.dto.ts
import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterTasksDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  completed?: boolean;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;
}