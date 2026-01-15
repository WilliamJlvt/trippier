import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(email: string, pass: string, name?: string): Promise<{
        email: string;
        name: string | null;
        id: number;
    }>;
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string | null;
        };
    }>;
}
