import { Model } from 'mongoose';
import { TokenBlacklistDocument } from './schemas/token-blacklist.schema';
export declare class TokenBlacklistService {
    private tokenBlacklistModel;
    constructor(tokenBlacklistModel: Model<TokenBlacklistDocument>);
    blacklistToken(token: string, expiresAt: Date): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
}
