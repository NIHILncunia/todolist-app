import { Injectable } from '@nestjs/common';
import { Todo, User } from '@prisma/client';
import { PrismaService } from '@/prisma.service';
import { UserWithOutPassword } from '@/types/user.types';

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaService) { }

  async getUsers(): Promise<UserWithOutPassword[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
  }

  async getUser(id: number): Promise<UserWithOutPassword> {
    return this.prisma.user.findUnique({
      where: { id: Number(id), },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id: Number(id), },
    });
  }

  async getUserTodos(id: number): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: { userId: Number(id), },
    });
  }
}
