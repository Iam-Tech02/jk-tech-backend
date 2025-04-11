import { UsersService } from 'src/modules/users/users.service';
declare const FacebookStrategy_base: new (...args: any[]) => any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any>;
}
export {};
