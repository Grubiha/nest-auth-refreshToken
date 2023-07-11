import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { JwtAuthGuard } from '../guards/guards/jwt-auth.guard';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({summary: 'Авторизация'})
  @ApiResponse({status: 200, type: ResponseAuthDto})
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const userData = await this.authService.login(dto)
    await this.setRefreshTokenToCookie(userData.refreshToken, res);
    return new ResponseAuthDto(userData);
  }

  @ApiOperation({summary: 'Регистрация'})
  @ApiResponse({status: 200, type: ResponseAuthDto})
  @Post('registration')
  async registration(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const userData = await this.authService.registration(dto);
    await this.setRefreshTokenToCookie(userData.refreshToken, res);

    return new ResponseAuthDto(userData);
  }

  @ApiOperation({summary: 'Выход (удаление refreshToken)'})
  @ApiResponse({status: 200})
  @Get('logout')
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken } = req.cookies;
    res.clearCookie("refreshToken");
    return this.authService.logout(refreshToken);
  }

  @ApiOperation({summary: '(обновление refreshToken)'})
  @ApiResponse({status: 200, type: ResponseAuthDto})
  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    await this.setRefreshTokenToCookie(userData.refreshToken, res);
    return new ResponseAuthDto(userData);
  }

  private async setRefreshTokenToCookie(refreshToken: string, res: Response){
    const now = new Date().getTime()
    res.cookie("refreshToken", refreshToken, {
      expires: new Date(now + Number(process.env.JWT_REFRESH_EXPIRE) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    });
  }

}
