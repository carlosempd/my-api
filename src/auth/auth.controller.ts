import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from 'src/core/dto/login.dto';

@Controller('auth')
export class AuthController {

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() body: LoginDto) {
        return body
    }
}
