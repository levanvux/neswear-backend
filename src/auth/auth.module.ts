import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { StorageModule } from '../storage/storage.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    StorageModule,
    PassportModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.getOrThrow<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '45m' },
    //   }),
    // }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtGuard,
    RolesGuard,
    JwtRefreshGuard,
  ],
  exports: [JwtModule, JwtGuard, RolesGuard, JwtRefreshGuard],
})
export class AuthModule {}
