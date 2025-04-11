import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { RoleService } from './role/role.service';
export declare class UsersController {
    private readonly usersService;
    private readonly roleService;
    constructor(usersService: UsersService, roleService: RoleService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    findAll(queryParams: FindAllUsersDto): Promise<{
        result: {
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
        }[];
        message: string;
    }>;
    findOne(id: number): Promise<{
        message: string;
        result: {
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
        };
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
