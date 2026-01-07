import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenBlacklist, TokenBlacklistDocument } from './schemas/token-blacklist.schema';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectModel(TokenBlacklist.name) private tokenBlacklistModel: Model<TokenBlacklistDocument>,
  ) {}

  async blacklistToken(token: string, expiresAt: Date): Promise<void> {
    // Check if token is already blacklisted
    const existingToken = await this.tokenBlacklistModel.findOne({ token });
    if (existingToken) {
      return; // Token already blacklisted
    }

    await this.tokenBlacklistModel.create({
      token,
      expiresAt,
    });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.tokenBlacklistModel.findOne({
      token,
      expiresAt: { $gt: new Date() },
    });
    return !!blacklistedToken;
  }
}