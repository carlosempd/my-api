import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    Req, 
    UseGuards } from '@nestjs/common';
import { CreatePostDto } from 'src/core/dto/createPost.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UpdatePostDto } from 'src/core/dto/updatePost.dto';
import { RatePostDto } from 'src/core/dto/ratePost.dto';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto, req['user']);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findById(@Param() params: { id: number }) {
        return this.postService.findById(params.id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.postService.remove(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(
        @Req() req: Request, 
        @Param('id') id: number, 
        @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(id, updatePostDto, req['user']);
    }

    @Post('rate')
    ratePost(@Body() ratePostDto: RatePostDto) {
        return this.postService.ratePost(ratePostDto);
    }
}
