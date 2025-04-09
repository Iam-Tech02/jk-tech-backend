import { Controller, Get, UseGuards, Req, Post, Body, Request, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { PostsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('posts')
export class BlogsController {
  constructor(private readonly postsService: PostsService) {}

  // Fetch only the logged-in user's posts
  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getUserPosts(@Req() req) {
    return this.postsService.findByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreateBlogDto, @Request() req) {
    return this.postsService.create(req.user, createPostDto);
  }

  @Get(':id') // Publicly accessible
  async findOne(@Param('id') id: number) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  // ✅ Get all posts (Public)
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Request() req, @Param('id') id: number, @Body() updatePostDto) {
    return this.postsService.update(req.user.id, id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    return this.postsService.remove(req.user.id, id);
  }
}
