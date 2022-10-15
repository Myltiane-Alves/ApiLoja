import { 
    Injectable,
    BadRequestException,
    NotFoundException,

} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService { 

    constructor(private prisma: PrismaService) {}

    async register(
        
        {
        userName,
        email,
        password,
        name,
        phone  

    }: {
        userName?: string;
        email: string;
        password: string;
        name: string;
        phone: string;
    }) {
        
        const userCreated = await this.prisma.user.create({
            data: {
                userName,
                password,
                email,
                name,
                phone

            }
        })

        if(userCreated) {
            return {
                message: 'User created successfully'
            }
        }
        
        
    }

    async getByEmail(email: string) {
        if(!email) {
            throw new BadRequestException('Email is required')
        }

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
