import { CookieOptions, Request, Response } from 'express';

export class CookieUtils {
  static getRequestJwt (token: 'access' | 'refresh') {
    return [
      (req: Request) => {
        const cookies = req.cookies;
        return cookies?.[`${token}_token`];
      },
    ];
  }

  static setResponseCookie (
    res: Response,
    tokenName: 'access' | 'refresh',
    token: string,
    options?: CookieOptions
  ) {
    res.cookie(`${tokenName}_token`, token, {
      httpOnly: true,
      secure: true,
      ...options,
    });
  }

  static setResponseJwt (
    res: Response,
    {
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    },
    {
      accessTokenExpires,
      refreshTokenExpires,
    }: {
      accessTokenExpires: number;
      refreshTokenExpires: number;
    }
  ) {
    CookieUtils.setResponseCookie(res, 'access', accessToken, {
      expires: new Date(accessTokenExpires),
    });

    CookieUtils.setResponseCookie(res, 'refresh', refreshToken, {
      expires: new Date(refreshTokenExpires),
    });
  }

  static clearResponseCookie (
    res: Response,
    cookieNames: ('access' | 'refresh')[]
  ) {
    for (const cookieName of cookieNames) {
      CookieUtils.setResponseCookie(res, cookieName, '', {
        expires: new Date(0),
      });
    }
  }
}
