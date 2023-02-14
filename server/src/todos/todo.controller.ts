import {
  Body, Controller, Delete, Get, Param, Post, Put
} from '@nestjs/common';
import { Todo } from '@prisma/client';
import { CreateTodoDTO } from './dto/create.todo.dto';
import { UpdateTodoDTO } from './dto/update.todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly todoService: TodoService) { }

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Get(':id')
  async getTodo(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getTodo(id);
  }

  @Post()
  async createTodo(@Body() createTodoDTO: CreateTodoDTO): Promise<Todo | null> {
    return this.todoService.createTodo(createTodoDTO);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDTO: UpdateTodoDTO
  ): Promise<Todo | null> {
    return this.todoService.updateTodo(id, updateTodoDTO);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  async updateProgress(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.updateProgress(id);
  }

  @Put(':id')
  async updateAdded(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.updateAdded(id);
  }

  @Put(':id')
  async updateDone(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.updateDone(id);
  }
}
