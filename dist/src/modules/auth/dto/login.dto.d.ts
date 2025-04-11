declare class UserDto {
    readonly name: string;
    readonly email: string;
    readonly id: string;
    readonly token: string;
}
export declare class LoginDto {
    readonly email: string;
    readonly password: string;
}
export declare class BrowserLoginDto {
    readonly provider: string;
    readonly user: UserDto;
}
export {};
