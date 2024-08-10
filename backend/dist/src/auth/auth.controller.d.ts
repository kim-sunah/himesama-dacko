import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(body: {
        email: string;
        nickname: string;
    }, req: Request, res: Response): Promise<{
        userId: number;
        nickname: string;
        email: string;
    }>;
    getSession(req: Request): {
        user: any;
    };
    logout(req: Request, res: Response): Promise<void>;
    findAll(): string;
    searchfind(id: string): Promise<import("../search/entities/search.entity").Search>;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
