import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/core/entity/permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
    ) {}

    findPermissionsByIds(id: number[]): Promise<Permission[]> {
        return this.permissionRepository.findBy({ id: In(id) })
    }
}
