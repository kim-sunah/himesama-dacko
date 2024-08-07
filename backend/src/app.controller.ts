
import { AppService } from './app.service';
import { Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { Response , Request } from 'express';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get("Test")
  // getHello(@Req() req: Request) {
  //   console.log("heelo")
  //   //  res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true , secure: false, sameSite:"none" });
  //   //  return res.send('Cookie has been set');
    
  // }
  @Get('set-cookie')
  setCookie(@Req() req: Request, @Res() res: Response) {
    res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
  }

  @Get("Test")
  findAll(@Session() session: Record<string, any>) {
    session.visits = "wqdsdsf123"
  }

  @Get('get-cookie')
  getCookie(@Res() res: Response) {
    const userCookie = res.req.cookies['user'];
    res.send(`Cookie value: ${userCookie}`);
  }

  @Get('set-session')
  setSession(@Req() req: Request, @Res() res: Response) {
    req.session.user = 'CHOI'; // 세션에 사용자 정보 설정
    res.send('Session has been set');
  }

  @Get('get-session')
  getSession(@Req() req: Request, @Res() res: Response) {
    console.log(req.session.user)
    if (req.session.user) {
      return {"Session value" : req.session.user}
      
    } else {
      res.status(404).send('No session data');
    }
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    req.session.user = { userId: 1, username: 'john.doe' };
    res.send('Login successful');
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    console.log("HEELO")
    // 세션에서 사용자 정보 제거
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Error');
      } else {
        res.send('Logout successful');
      }
    });
  }
}
