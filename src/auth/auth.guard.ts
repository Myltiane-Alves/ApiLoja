import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private userService: UserService,

        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers['authorization'];

        if(!authorization) {
            throw new BadRequestException("Token is required");
        }

        try {

            const token = authorization.split(' ')[1];

            this.jwtService.verify(token);

            request.auth = this.jwtService.decode(token) as AuthType;

            request.user = await this.prisma.user.findFirst({
                where: {id: request.auth.id},
                include: {person: true},

            });

            if (!request.user) {
                throw new UnauthorizedException('User not found.');
            }

            return true;
        } catch(e) {
            throw new UnauthorizedException(e.message);
        }
    }
}
