import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/core/entity/user.entity';
import { UsersService } from './users.service';
import { log } from 'console';
import { CreateUserDto } from 'src/core/dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param() params: {id: number}) {
        return this.userService.findById(params.id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createUserBody: CreateUserDto) {
        return this.userService.create(createUserBody);
    }
}
