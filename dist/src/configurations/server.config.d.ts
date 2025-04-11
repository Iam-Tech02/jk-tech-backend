export declare const serverConfig: () => {
    config: {
        port: number;
        nodeEnv: import("./env.validation").Environment;
    };
};
export type ServerConfig = ReturnType<typeof serverConfig>['config'];
