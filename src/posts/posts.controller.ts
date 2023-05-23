import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from 'src/core/dto/createPost.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto, req['user']);
    }
}
