// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}


  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalTasks = await this.prisma.task.count();
    const completedTasks = await this.prisma.task.count({
      where: { completed: true },
    });

    return {
      users: totalUsers,
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: totalTasks - completedTasks,
      },
    };
  }
}