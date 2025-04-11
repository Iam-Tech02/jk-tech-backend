import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        roleId: number;
        isVerified: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private generatePasswordHash;
    findAll(pageNumber: number): import(".prisma/client").Prisma.PrismaPromise<{
        role: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOneById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        role: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        id: number;
        name: string;
        email: string;
        isVerified: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneByEmail(email: string, sensitiveInfo?: boolean): import(".prisma/client").Prisma.Prisma__UserClient<{
        role: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        id: number;
        name: string;
        email: string;
        password: string;
        isVerified: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    saveOAuthUser(email: string, name: string, isVerified?: boolean): import(".prisma/client").Prisma.Prisma__UserClient<{
        role: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        id: number;
        name: string;
        email: string;
        isVerified: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        name: string;
        email: string;
        password: string;
        roleId: number;
        isVerified: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        name: string;
        email: string;
        password: string;
        roleId: number;
        isVerified: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
