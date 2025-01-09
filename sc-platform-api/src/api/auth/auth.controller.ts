import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiEndpoint, GetUser } from '../../documentation/decorators';
import { User } from '@prisma/client';
import { LocalGuard } from '../../security/jwt/local/local.guard';
import { RefreshGuard } from '../../security/jwt/refresh/refresh.guard';
import { Response } from 'express';
import { CookieUtils } from '../../utils/cookie.utils';
import { RegisterDTO } from '@student-council-platform/utils/requests/auth';
import { UserWithRefreshToken } from '../../security/jwt/refresh/refresh.strategy';
import { AuthDocumentation } from '../../documentation/auth';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @ApiEndpoint({
    summary: 'Register new account',
    documentation: AuthDocumentation.REGISTER,
  })
  @Post('/register')
  async register (
    @Body() data: RegisterDTO,
  ) {
    return this.authService.register(data);
  }

  @ApiEndpoint({
    summary: 'Login',
    guards: LocalGuard,
    documentation: AuthDocumentation.LOGIN,
  })
  @Post('/login')
  async login (
    @GetUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user);
    CookieUtils.setResponseJwt(response, tokens, {
      accessTokenExpires: this.authService.getTokenExpTime(tokens.accessToken),
      refreshTokenExpires: this.authService.getTokenExpTime(tokens.refreshToken),
    });
  }

  @ApiEndpoint({
    summary: 'Get new access token',
    guards: RefreshGuard,
    documentation: AuthDocumentation.REFRESH,
  })
  @Post('/refresh')
  async refresh (
    @GetUser() user: UserWithRefreshToken,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.refresh(user);
    CookieUtils.setResponseJwt(response, tokens, {
      accessTokenExpires: this.authService.getTokenExpTime(tokens.accessToken),
      refreshTokenExpires: this.authService.getTokenExpTime(tokens.refreshToken),
    });
  }

  @ApiEndpoint({
    summary: 'Logout',
    guards: RefreshGuard,
    documentation: AuthDocumentation.LOGOUT,
  })
  @Delete('/logout')
  async logout (
    @GetUser() user: UserWithRefreshToken,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user);
    CookieUtils.clearResponseCookie(response, ['access', 'refresh']);
  }
}
