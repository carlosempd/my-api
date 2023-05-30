import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/core/dto/createUser.dto';
import { User } from 'src/core/entity/user.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private permissionService: PermissionsService
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: { role: true, permission: true }
        });
    }

    findById(id: number): Promise<User> {
        return this.usersRepository.findOne({
            where: { id },
            relations: { role: true, permission: true }
        });
    }

    findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ 
            where: { email },
            relations: { role: true, permission: true } 
        });
    }

    async grantPermissionToUser(id: number, permissionIds: number[]) {
        const permissions = await this.permissionService.findPermissionsByIds(
            permissionIds
        );
        console.log('perm', permissions);
        
        const user = await this.findById(id);
        console.log('user', user);
        
        user.permission = user.permission.concat(permissions);
        return this.usersRepository.save(user);

    }

    async remove(id: number) {
        return await this.usersRepository.softDelete(id);
    }

    create(body: CreateUserDto): Promise<User> {
        const user = new User();
        user.email = body.email;
        user.name = body.name;
        user.lastname = body.lastname;
        user.password = body.password;
        user.role = { id: body.roleId, name: body.roleId === 1 ? 'user' : 'admin' }
        return this.usersRepository.save(user);
    }
}
