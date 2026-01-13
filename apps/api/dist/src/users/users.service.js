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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const role_enum_1 = require("../common/enums/role.enum");
const email_service_1 = require("../email/email.service");
const constants_1 = require("../common/constants");
let UsersService = class UsersService {
    userModel;
    emailService;
    constructor(userModel, emailService) {
        this.userModel = userModel;
        this.emailService = emailService;
    }
    generateRandomPassword(length = constants_1.PASSWORD_LENGTH) {
        let password = '';
        for (let i = 0; i < length; i++) {
            password += constants_1.PASSWORD_CHARS.charAt(Math.floor(Math.random() * constants_1.PASSWORD_CHARS.length));
        }
        return password;
    }
    async create(createUserDto) {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const generatedPassword = this.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(generatedPassword, constants_1.BCRYPT_ROUNDS);
        const user = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            role: createUserDto.role || role_enum_1.Role.STUDENT,
        });
        await this.emailService.sendUserPassword(user.email, generatedPassword);
        return user.save();
    }
    findAll() {
        return `This action returns all users`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    async update(id, updateUserDto, currentUser) {
        const isOwner = currentUser._id.equals(id);
        const isAdmin = currentUser.role === role_enum_1.Role.ADMIN;
        if (!isOwner && !isAdmin) {
            throw new common_1.ForbiddenException('You cannot update this user');
        }
        if (!isAdmin && 'role' in updateUserDto) {
            throw new common_1.ForbiddenException('You cannot change your role');
        }
        if (isAdmin && !isOwner) {
            const allowedAdminFields = ['role', 'deletedAt', 'isActive'];
            const invalidFields = Object.keys(updateUserDto).filter(key => !allowedAdminFields.includes(key));
            if (invalidFields.length > 0) {
                throw new common_1.ForbiddenException(`Admins cannot update fields: ${invalidFields.join(', ')}`);
            }
        }
        if (updateUserDto.email) {
            const existingUser = await this.userModel.findOne({ email: updateUserDto.email });
            if (existingUser && !existingUser._id.equals(id)) {
                throw new common_1.ConflictException('Email already in use');
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, constants_1.BCRYPT_ROUNDS);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true }).exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with ID #${id} not found`);
        }
        return updatedUser;
    }
    async remove(id, currentUser) {
        return this.update(id, { deletedAt: new Date() }, currentUser);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map