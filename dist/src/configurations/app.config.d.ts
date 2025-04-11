export declare const appConfig: () => {
    jwt: {
        secret: string;
        expiry: string;
    };
    bcrypt: {
        saltRounds: number;
    };
    swagger: {
        title: string;
        version: string;
        path: string;
    };
    oAuth: {
        google: {
            clientId: string;
            clientSecret: string;
            redirectUri: string;
        };
    };
    users: {
        findAll: {
            limit: number;
        };
        defaultRoleId: number;
    };
    blogs: {
        findAll: {
            limit: number;
        };
        defaultRoleId: number;
    };
};
export type AppConfig = ReturnType<typeof appConfig>;
