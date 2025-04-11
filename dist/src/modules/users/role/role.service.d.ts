import { PrismaService } from 'src/prisma/prisma.service';
export declare class RoleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOneById(roleId: number): import(".prisma/client").Prisma.Prisma__RoleClient<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
