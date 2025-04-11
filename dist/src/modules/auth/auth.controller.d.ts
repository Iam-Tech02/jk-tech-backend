import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { BrowserLoginDto, LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    login(payload: LoginDto): Promise<{
        access_token: string;
    }>;
    googleOAuthLogin(): Promise<void>;
    googleOAuthRedirect(googleUser: Record<string, string>): Promise<{
        access_token: string;
    }>;
    facebookOAuthLogin(): Promise<void>;
    facebookOAuthRedirect(facebookUser: Record<string, string>): Promise<{
        access_token: string;
    }>;
    browserLogin(payload: BrowserLoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: string;
        };
    }>;
    verifyToken(provider: string, user: BrowserLoginDto['user']): Promise<void>;
}
