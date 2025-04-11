import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(payload: {
        id: number;
    }): Promise<{
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
    }>;
}
export {};
