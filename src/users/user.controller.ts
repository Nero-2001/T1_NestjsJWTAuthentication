import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService }  from './user.service';
import { User } from '../typeorm/entities/User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() userData: { username: string; password: string }): Promise<User> {
    return await this.usersService.createUser(userData);
  }
}