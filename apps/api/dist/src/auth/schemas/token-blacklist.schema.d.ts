import { Document } from 'mongoose';
export type TokenBlacklistDocument = TokenBlacklist & Document;
export declare class TokenBlacklist {
    token: string;
    expiresAt: Date;
}
export declare const TokenBlacklistSchema: import("mongoose").Schema<TokenBlacklist, import("mongoose").Model<TokenBlacklist, any, any, any, (Document<unknown, any, TokenBlacklist, any, import("mongoose").DefaultSchemaOptions> & TokenBlacklist & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, TokenBlacklist, any, import("mongoose").DefaultSchemaOptions> & TokenBlacklist & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, TokenBlacklist>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TokenBlacklist & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    token?: import("mongoose").SchemaDefinitionProperty<string, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, TokenBlacklist, Document<unknown, {}, TokenBlacklist, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<TokenBlacklist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TokenBlacklist>;
