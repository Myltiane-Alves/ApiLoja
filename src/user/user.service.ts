import { 
    Injectable,
    BadRequestException,
    NotFoundException,
    UnauthorizedException

} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService { 

    constructor(private prisma: PrismaService) {}

    async get(id: number, hashPassword = false) {
        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('Id is required');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        })

        if(!hashPassword) {
            delete user.password;
        }

        if(!user) {
            throw new BadRequestException('User not found');
        }

        return user;
    }

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

    async checkPassword(id: number, password: string){
        const user = await this.get(id, true);

        const checked = await bcrypt.compare(password, user.password);

        if(!checked) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        return true;
    }

    async delete(id: number) {
        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('Id is required');
        }

        const user = await this.prisma.user.delete({
            where: {
                id,
            }
        })

        if(!user) {
            throw new BadRequestException('User not found');
        }

        return { message: 'User deleted successfully', user };
    }
}
