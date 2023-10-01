import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../entities/user.entity';
import { Repository, FindOptions, FindOneOptions } from 'typeorm';
import { UserInterface } from '../models/user.interface';

import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateUserDto } from '../dto/create-user-dto';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}

    async findAll(): Promise<UserInterface[]> {
        return await this.userRepository.find();
    }

    async findOneOrFail(
        email: string,
      ) {
        return await this.userRepository.findOneBy({email: email});
      }

    async postLogin(data: CreateUserDto){
        const checkUser = await this.findOneOrFail(data.email)
  
        if(checkUser)
            throw new BadRequestException({message: MessagesHelper.NOT_CREATE_SUCCESSFUL_EMAIL_EXISTS});

        const user = await this.userRepository.create(data);
        try{
            await this.userRepository.save(user);
            return {message: MessagesHelper.CREATE_SUCCESSFUL};
        }
        catch(err){
            throw new BadRequestException({message: MessagesHelper.NOT_CREATE_SUCCESSFUL_PATTERN});
        }
   
    }

    getHello(): string {
        return 'Hello World!';
    }
    
}
