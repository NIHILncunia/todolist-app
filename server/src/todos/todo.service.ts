import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '@/prisma.service';
import { CreateTodoDTO } from './dto/create.todo.dto';
import { UpdateTodoDTO } from './dto/update.todo.dto';

@Injectable()
export class TodoService {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaService) { }

  async getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async getTodo(id: number): Promise<Todo> {
    return this.prisma.todo.findUnique({
      where: { id: Number(id), },
    });
  }

  async createTodo(createTodoDTO: CreateTodoDTO): Promise<Todo | null> {
    const { todo, userId, } = createTodoDTO;

    return this.prisma.todo.create({
      data: {
        todo,
        userId,
      },
    });
  }

  async updateTodo(id: number, updateTodoDTO: UpdateTodoDTO): Promise<Todo | null> {
    const { todo, } = updateTodoDTO;

    return this.prisma.todo.update({
      where: { id: Number(id), },
      data: {
        todo,
      },
    });
  }

  async deleteTodo(id: number): Promise<Todo | null> {
    return this.prisma.todo.delete({
      where: { id: Number(id), },
    });
  }

  async updateProgress(id: number): Promise<Todo | null> {
    return this.prisma.todo.update({
      where: { id: Number(id), },
      data: {
        status: 'PROGRESS',
      },
    });
  }

  async updateAdded(id: number): Promise<Todo | null> {
    return this.prisma.todo.update({
      where: { id: Number(id), },
      data: {
        status: 'ADDED',
      },
    });
  }

  async updateDone(id: number): Promise<Todo | null> {
    return this.prisma.todo.update({
      where: { id: Number(id), },
      data: {
        status: 'DONE',
      },
    });
  }
}
