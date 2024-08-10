import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { Response, Request } from 'express';
import { Search } from 'src/search/entities/search.entity';
export declare class AuthService {
    private readonly AuthRepository;
    private readonly SearchRepository;
    constructor(AuthRepository: Repository<Auth>, SearchRepository: Repository<Search>);
    Kakaocreate(email: string, nickname: string, req: Request, res: Response): Promise<{
        userId: number;
        nickname: string;
        email: string;
    }>;
    findAll(): string;
    searchfind(id: number): Promise<Search>;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
