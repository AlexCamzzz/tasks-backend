import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Crear un nuevo usuario
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  // Encontrar todos los usuarios
  async findAll() {
    return this.prisma.user.findMany();
  }

  // Encontrar un usuario por ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Encontrar un usuario por email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Actualizar un usuario
  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Eliminar un usuario
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}