
import { AppService } from './app.service';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("Test")
  getHello() {
    console.log("HELLO")
    // res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
    // return res.send('Cookie has been set');
    
  }
}
