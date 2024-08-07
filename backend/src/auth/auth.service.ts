import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Response , Request } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly AuthRepository: Repository<Auth>){

  }


  async Kakaocreate(email : string, nickname : string, req: Request, res: Response) {
    const Existuser = await this.AuthRepository.findOne({where :{ email : email}});
    if(Existuser){
      req.session.user = { userId: Existuser.id, email: Existuser.email , nickname : Existuser.nickname };
      res.send('Login successful');
      return {nickname : Existuser.nickname, email : Existuser.email}
    }
   
    const user = await this.AuthRepository.create({email : email  , nickname : nickname})
    req.session.user = { userId: user.id, email: user.email , nickname : user.nickname };
    res.send('Login successful');
    await this.AuthRepository.save(user);
    return {nickname : user.nickname, email : user.email}
    
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
