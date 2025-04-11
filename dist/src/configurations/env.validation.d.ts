declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvironmentVariables {
        }
    }
}
export declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    GOOGLE_OAUTH_CLIENT_ID: string;
    GOOGLE_OAUTH_CLIENT_SECRET: string;
    GOOGLE_OAUTH_REDIRECT_URI: string;
    FACEBOOK_OAUTH_CLIENT_ID: string;
    FACEBOOK_OAUTH_CLIENT_SECRET: string;
    FACEBOOK_OAUTH_REDIRECT_URI: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
