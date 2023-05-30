import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PermissionsModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService]
})
export class UsersModule {}
