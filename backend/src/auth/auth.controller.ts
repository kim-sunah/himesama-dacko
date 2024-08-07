import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response, Request } from 'express';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post("Kakao")
  create(@Body() body: { email: string; nickname: string; }, @Req() req: Request, @Res() res: Response) {
    const { email, nickname } = body
    return this.authService.Kakaocreate(email, nickname, req, res);
  }

  @Get('getsession')
  getSession(@Req() req: Request) {
    if (req.session.user) {
      return {user : req.session.user}
    } 
    throw new UnauthorizedException("로그인 후 이용바랍니다")
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return new Promise<void>((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Logout failed' });
        } else {
          res.setHeader('Clear-Site-Data', '"cookies", "storage"');
          res.clearCookie('connect.sid', { path: '/' }); // 쿠키 이름이 'connect.sid'라고 가정
          res.status(HttpStatus.OK).json({ message: 'Logout successful' });
        }
        resolve();
      });
    });
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
