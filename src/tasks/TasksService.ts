// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: Prisma.TaskCreateWithoutUserInput) {
    return this.prisma.task.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: number, filters: any) {
    const where: Prisma.TaskWhereInput = {
      userId,
    };

    // Aplicar filtros si existen
    if (filters) {
      if (filters.completed !== undefined) {
        where.completed = filters.completed;
      }

      if (filters.category) {
        where.category = filters.category;
      }

      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search } },
          { description: { contains: filters.search } },
        ];
      }
    }

    return this.prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, userId: number, data: Prisma.TaskUpdateInput) {
    // Verificar si la tarea existe y pertenece al usuario
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, userId: number) {
    // Verificar si la tarea existe y pertenece al usuario
    await this.findOne(id, userId);

    return this.prisma.task.delete({
      where: { id },
    });
  }

  async complete(id: number, userId: number) {
    // Verificar si la tarea existe y pertenece al usuario
    await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id },
      data: { completed: true },
    });
  }
}