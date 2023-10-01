import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Body } from '@nestjs/common/decorators';
import { CreateUserDto } from '../dto/create-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller('api/v1/user')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async postLogin(@Body() body: CreateUserDto) {
    
    return await this.userService.postLogin(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(){
    return this.userService.getHello()
  }
}
