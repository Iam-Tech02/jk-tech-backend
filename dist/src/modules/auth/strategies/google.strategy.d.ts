import { VerifyCallback, Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/modules/users/users.service';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
