import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        name: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        password: string;
        name: string | null;
        id: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        name: string | null;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        name: string | null;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        name: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        name: string | null;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
