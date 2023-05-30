import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/core/dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async login(body: LoginDto) {
        const user = await this.userService.findByEmail(body.email);
        
        if (!user || user?.password !== body.password) {
            throw new UnauthorizedException();
        }
        
        const payload = { 
            email: user.email, 
            sub: user.id, 
            role: user.role,
            permissions: user.permission.map(el => el.id)
        };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('jwt.secret'),
            })
        };
    }
}
