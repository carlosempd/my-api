import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/core/entity/permission.entity';

@Module({
  providers: [PermissionsService],
  controllers: [],
  imports: [TypeOrmModule.forFeature([Permission])],
  exports: [PermissionsService]
})
export class PermissionsModule {}
