// src/users/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}