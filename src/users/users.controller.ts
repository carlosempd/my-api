import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/core/entity/user.entity';
import { UsersService } from './users.service';
import { log } from 'console';

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
}
