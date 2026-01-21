import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  Headers,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    // We don't use @UseGuards(JwtAuthGuard) because the access token is likely expired.
    // We rely on the service to verify the refreshToken.
    // However, the service `refreshTokens` currently takes `userId`.
    // We need to extract the userId from the refreshToken itself in the Service.
    // So I need to update the Service method signature OR extract it here.
    // Let's update the Service to take just the refreshToken string (and maybe extract ID there).
    // Actually, checking AuthService...
    /*
      async refreshTokens(userId: string, refreshToken: string) { ... }
    */
    // It verifies the hash against the user in DB. I need the userId to look up the user!
    // So checking the Refresh Token (JWT) allows me to get the userId.

    // I need to decode the token here or in service.
    // I'll update AuthService to handle the decoding/verification of the JWT structure first.

    // For now, I'll pass the token to a NEW service method or update the existing one.
    // Let's assume I will update AuthService to: async refreshTokens(refreshToken: string)

    return this.authService.refreshTokensFromDto(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(
    @Headers('authorization') authHeader: string,
    @CurrentUser() user: User,
  ) {
    const token = authHeader?.replace('Bearer ', '');
    return this.authService.logout(token, user?._id.toString());
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: User) {
    return {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      role: user.role,
    };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(user, updateProfileDto);
  }
}
