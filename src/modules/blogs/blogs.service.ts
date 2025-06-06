import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/configurations/app.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(addedBy: number, createBlogDto: CreateBlogDto) {
    const { title, about, brief } = createBlogDto;
    return this.prisma.blog.create({
      data: {
        title,
        about,
        brief,
        addedBy,
      },
    });
  }

  findAll() {
    return this.prisma.blog.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        about: true,
        brief: true,
        addedBy: true,
        comments: true,
        likes: true,
        shares: true,
        views: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  findOneById(id: number) {
    return this.prisma.blog.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  findOneByKeywords(searchString: string) {
    return this.prisma.blog.findFirst({
      where: {
        title: {
          contains: searchString,
        },
        isDeleted: false,
      },
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: {
        id,
      },
      data: updateBlogDto,
    });
  }

  remove(id: number) {
    return this.prisma.blog.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
