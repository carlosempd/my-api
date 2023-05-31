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
import { PermissionGuard } from 'src/core/guards/permission.guard';
import { Permission } from 'src/core/decorators/permission.decorator';
import { PermissionEnum } from 'src/core/enums/permission.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @UseGuards(AuthGuard, PermissionGuard)
    @Permission(PermissionEnum.create)
    @Post()
    create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto, req['user']);
    }

    @UseGuards(AuthGuard, PermissionGuard)
    @Permission(PermissionEnum.read)
    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @UseGuards(AuthGuard, PermissionGuard)
    @Permission(PermissionEnum.read)
    @Get(':id')
    findById(@Param() params: { id: number }) {
        return this.postService.findById(params.id);
    }

    @UseGuards(AuthGuard, PermissionGuard)
    @Permission(PermissionEnum.delete)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.postService.remove(id);
    }

    @Permission(PermissionEnum.update)
    @UseGuards(AuthGuard, PermissionGuard)
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
