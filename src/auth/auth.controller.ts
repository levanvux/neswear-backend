import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { UpdateAddressDto } from '../users/dto/update-address.dto';
import { CreateAddressDto } from '../users/dto/create-address.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
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
    @Request() req: { user: ActiveUserData },
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
  async getMe(@Request() req: { user: ActiveUserData }) {
    return this.authService.getMe(req.user.userId);
  }

  // @UseGuards(JwtGuard)
  // @Patch('me')
  // updateMe() {
  //   return 'update me';
  // }

  @UseGuards(JwtGuard)
  @Post('me/addresses')
  async createAddress(
    @Request() req: { user: ActiveUserData },
    @Body() dto: CreateAddressDto,
  ) {
    return this.usersService.createAddress(req.user.userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('me/addresses/:id')
  async updateAddress(
    @Request() req: { user: ActiveUserData },
    @Param('id') addressId: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.usersService.updateAddress(req.user.userId, addressId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('me/addresses/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAddress(
    @Request() req: { user: ActiveUserData },
    @Param('id') addressId: number,
  ) {
    await this.usersService.deleteAddress(req.user.userId, addressId);
  }
}
