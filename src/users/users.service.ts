import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findById(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number) {
        return await this.usersRepository.softDelete(id);
    }
}
