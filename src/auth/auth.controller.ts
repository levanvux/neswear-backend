import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Role } from '../common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.authService.login(loginDto);

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') !== 'development',
      sameSite: 'strict',
      maxAge: sevenDaysInMs,
    });

    return { access_token };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Request() req: { user: { userId: number; email: string; role: Role } },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { userId, email, role } = req.user;

    const { access_token, refresh_token } =
      await this.authService.refreshTokens(userId, email, role);

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') !== 'development',
      sameSite: 'strict',
      maxAge: sevenDaysInMs,
    });

    return { access_token };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return { message: 'Đã đăng xuất' };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(
    @Request() req: { user: { userId: number; email: string; role: Role } },
  ) {
    return this.authService.getMe(req.user.userId);
  }
}
