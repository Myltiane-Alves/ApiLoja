import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async getToken(userId: number) {
        const { email, id, photo, person} = await this.userService.get(userId);
        const { name } = person;

        return this.jwtService.sign({ email, id });
    }

    async login({email, password}: {email: string, password: string}) {

        const user = await this.userService.getByEmail(email);

        await this.userService.checkPassword(user.id, password);

        const token = await this.getToken(user.id)

        return { token };
    }

    async decodeToken(token: string) {
        try {
            await this.jwtService.verify(token);
        } catch(e) {
            throw new UnauthorizedException(e.message);
        }

        return this.jwtService.decode(token);
    }

    async recovery(email: string) {

        const {id, person } = await this.userService.getByEmail(email);
        const { name } = person;

        const token = await this.jwtService.sign({ id }, {
            expiresIn: 30 * 60,
        })

        await this.prisma.passwordRecovery.create({
            data: {
                token,
                userId: id,
            }
        })

        return { success: true };
    }

    async reset({password, token}: {password: string, token: string}){

        if (!password) {
            throw new BadRequestException('Password is required');
        }

        try {
            await this.jwtService.verify(token);
        } catch (e) {
            throw new BadRequestException(e.message);
        }

        const passwordrecovery = await this.prisma.passwordRecovery.findFirst({
            where: {
                token,
                resetAt: null,
            }
        });

        if (!passwordrecovery) {
            throw new BadRequestException('Invalid used');
        }

        await this.prisma.passwordRecovery.update({
            where: {
                id: passwordrecovery.id,
            },
            data: {
                resetAt: new Date(),
            }
        });

        return this.userService.updatePassword(
            passwordrecovery.userId,
            password,
        )
    }
}
