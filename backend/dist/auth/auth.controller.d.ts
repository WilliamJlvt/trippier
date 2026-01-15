import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: Record<string, any>): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string | null;
        };
    }>;
    register(registerDto: Record<string, any>): Promise<{
        email: string;
        name: string | null;
        id: number;
    }>;
}
