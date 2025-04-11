import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FindAllBlogsDto } from './dto/find-all-blogs.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FindUserByIdResponse } from 'src/common/types/response.type';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: CreateBlogDto, user: FindUserByIdResponse): Promise<{
        message: string;
    }>;
    findAll(queryParams: FindAllBlogsDto): Promise<{
        result: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            about: string;
            brief: string;
            addedBy: number;
            comments: import(".prisma/client").Prisma.JsonValue;
            likes: import(".prisma/client").Prisma.JsonValue;
            shares: import(".prisma/client").Prisma.JsonValue;
            views: import(".prisma/client").Prisma.JsonValue;
        }[];
        message: string;
    }>;
    findOne(id: number): Promise<{
        message: string;
        result: {
            id: number;
            title: string;
            about: string;
            brief: string;
            addedBy: number;
            comments: import(".prisma/client").Prisma.JsonValue;
            likes: import(".prisma/client").Prisma.JsonValue;
            shares: import(".prisma/client").Prisma.JsonValue;
            views: import(".prisma/client").Prisma.JsonValue;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
