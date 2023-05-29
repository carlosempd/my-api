import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/core/entity/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/core/dto/createUser.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { Role } from 'src/core/enums/role.enum';
import { RolesGuard } from 'src/core/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Roles(Role.Admin)
    @Get(':id')
    findById(@Param() params: {id: number}) {
        return this.userService.findById(params.id);
    }

    @Roles(Role.Admin)
    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createUserBody: CreateUserDto) {
        return this.userService.create(createUserBody);
    }
}
