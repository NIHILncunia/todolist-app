import {
  Controller, Delete, Get, Param
} from '@nestjs/common';
import { Todo, User } from '@prisma/client';
import { UsersService } from './users.service';
import { UserWithOutPassword } from '@/types/user.types';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUsers(): Promise<UserWithOutPassword[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserWithOutPassword> {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User | null> {
    return this.usersService.deleteUser(id);
  }

  @Get(':id/todos')
  async getUserTodos(@Param('id') id: number): Promise<Todo[]> {
    return this.usersService.getUserTodos(id);
  }
}
