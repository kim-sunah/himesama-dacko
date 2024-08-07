import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Response, Request } from 'express';
export declare class AuthService {
    private readonly AuthRepository;
    constructor(AuthRepository: Repository<Auth>);
    Kakaocreate(email: string, nickname: string, req: Request, res: Response): Promise<{
        nickname: string;
        email: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
