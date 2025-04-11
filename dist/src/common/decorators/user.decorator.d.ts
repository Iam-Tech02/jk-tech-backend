import { FindUserByIdResponse } from '../types/response.type';
export type UserDecorator = NonNullable<FindUserByIdResponse>;
export declare const User: (...dataOrPipes: unknown[]) => ParameterDecorator;
