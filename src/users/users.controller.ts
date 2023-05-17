import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/core/entity/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/core/dto/createUser.dto';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(AuthGuard)
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
