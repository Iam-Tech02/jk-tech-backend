import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsController } from './blogs.controller';
import { PostsService } from './blogs.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class BlogsModule {}
