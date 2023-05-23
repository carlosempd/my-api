import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/core/dto/createPost.dto';
import { Posts } from 'src/core/entity/post.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepository: Repository<Posts>,
        private userService: UsersService
    ) {}

    async create(
        body: CreatePostDto, 
        userFromToken: { email: string, sub: number }
    ): Promise<Posts> {
        const post = new Posts();
        const user = await this.userService.findById(userFromToken.sub);
        post.name = body.name;
        post.text = body.text;
        post.author = user;

        return this.postRepository.save(post);
    }

    findAll(): Promise<Posts[]> {
        return this.postRepository.find();
    }

    findById(id: number): Promise<Posts> {
        return this.postRepository.findOneBy({ id });
    }

    async remove (id: number) {
        return await this.postRepository.softDelete({ id });
    }

    async update(id: number, updatePostDto): Promise<Posts> {
        const post = await this.findById(id);

        if (!post) {
            throw new BadRequestException({ message: 'Post doesn\'t exist' })
        }

        Object.assign(post, updatePostDto);

        return this.postRepository.save(post);
    }
}
