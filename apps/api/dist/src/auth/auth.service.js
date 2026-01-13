"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("../users/entities/user.entity");
const role_enum_1 = require("../common/enums/role.enum");
const constants_1 = require("../common/constants");
const token_blacklist_service_1 = require("./token-blacklist.service");
let AuthService = class AuthService {
    userModel;
    jwtService;
    tokenBlacklistService;
    constructor(userModel, jwtService, tokenBlacklistService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.tokenBlacklistService = tokenBlacklistService;
    }
    generateToken(user) {
        const payload = {
            sub: user._id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
    async register(registerDto) {
        const existingUser = await this.userModel.findOne({ email: registerDto.email });
        if (existingUser) {
            throw new common_1.ConflictException('An account with this email address already exists. Please use a different email or try logging in.');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, constants_1.BCRYPT_ROUNDS);
        const user = new this.userModel({
            ...registerDto,
            password: hashedPassword,
            role: role_enum_1.Role.STUDENT,
        });
        await user.save();
        const accessToken = this.generateToken(user);
        return {
            message: 'Registration successful',
            accessToken,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }
    async login(loginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password. Please check your credentials and try again.');
        }
        if (user.deletedAt) {
            throw new common_1.UnauthorizedException('This account has been deleted. Please contact support if you believe this is an error.');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact support to reactivate your account.');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password. Please check your credentials and try again.');
        }
        const accessToken = this.generateToken(user);
        return {
            message: 'Login successful',
            accessToken,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }
    async logout(token, user) {
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided for logout.');
        }
        try {
            const decoded = this.jwtService.decode(token);
            const expiresAt = new Date(decoded.exp * 1000);
            await this.tokenBlacklistService.blacklistToken(token, expiresAt);
            return {
                message: 'Logout successful. Your session has been terminated.',
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token provided for logout.');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        token_blacklist_service_1.TokenBlacklistService])
], AuthService);
//# sourceMappingURL=auth.service.js.map