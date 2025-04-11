import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService);
    login(email: string, plainPassword: string): Promise<{
        access_token: string;
    }>;
    private getJwtSecret;
    private getJwtExpiry;
    matchPassword(hashedPassword: string, plainPassword: string): Promise<void>;
    isEntityFound<T>(entity: T): T;
    private getJwtSignOptions;
    private makeJwtPayload;
    signJwt(userId: number, role: string): Promise<string>;
}
