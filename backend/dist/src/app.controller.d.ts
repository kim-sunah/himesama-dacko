import { AppService } from './app.service';
import { Response, Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    setCookie(req: Request, res: Response): void;
    findAll(session: Record<string, any>): void;
    getCookie(res: Response): void;
    setSession(req: Request, res: Response): void;
    getSession(req: Request, res: Response): {
        "Session value": any;
    };
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
}
