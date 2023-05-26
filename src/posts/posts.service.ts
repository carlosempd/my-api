import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/core/dto/createPost.dto';
import { RatePostDto } from 'src/core/dto/ratePost.dto';
import { UpdatePostDto } from 'src/core/dto/updatePost.dto';
import { Posts } from 'src/core/entity/post.entity';
import { IUserFromToken } from 'src/core/interfaces/user.interface';
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
        userFromToken: IUserFromToken
    ): Promise<Posts> {
        const post = new Posts();
        const user = await this.userService.findById(userFromToken.sub);
        post.name = body.name;
        post.text = body.text;
        post.author = user;

        return this.postRepository.save(post);
    }

    findAll(): Promise<Posts[]> {
        return this.postRepository.find({
            order: {
                creationDate: 'DESC'
            }
        });
    }

    findById(id: number): Promise<Posts> {
        return this.postRepository.findOneBy({ id });
    }

    async remove (id: number) {
        return await this.postRepository.softDelete({ id });
    }

    async update(
        id: number, 
        updatePostDto: UpdatePostDto, 
        userFromToken: IUserFromToken
    ): Promise<Posts> {
        const post = await this.findById(id);
        const user = await this.userService.findById(userFromToken.sub);

        if (!post) {
            throw new BadRequestException({ message: 'Post doesn\'t exist' })
        }

        Object.assign(post, updatePostDto);
        post.editDate = new Date();
        post.editUser = post.editUser?.concat(user) ?? [user];

        return this.postRepository.save(post);
    }

    async ratePost(ratePostDto: RatePostDto): Promise<Posts> {
        const post = await this.findById(ratePostDto.id);
        post.rating = post.rating?.concat(ratePostDto.rating) ?? [ratePostDto.rating];
        return this.postRepository.save(post);
    }
}
