import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { parse } from 'date-fns';
import { getOnlyNumbers } from 'src/utils/getOnlyNumbers';

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

        await this.prisma.passwordrecovery.create({
            data: {
                token,
                userId: id,
            }
        })

        return { success: true };
    }

    async checkResetToken({ token }: { token: string}) {
        if(!token) {
            throw new BadRequestException("Token is required");
        }

        try {
            await this.jwtService.verify(token);
            return true;
        } catch(e) {
            return false;
        }
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

        const passwordrecovery = await this.prisma.passwordrecovery.findFirst({
            where: {
                token,
                resetAt: null,
            }
        });

        if (!passwordrecovery) {
            throw new BadRequestException('Invalid used');
        }

        await this.prisma.passwordrecovery.update({
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

    async register({
        name,
        email,
        password,
        passwordConfirm,
        birthAt,
        document,
        phone,
    }: {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
        birthAt: string;
        document: string;
        phone: string;
    }) {
        if (password !== passwordConfirm) {
            throw new BadRequestException(
                'Password and password confirm must be the same',
            );
        }

        let finalBirthAt = null;

        if (birthAt) {
            try {
                finalBirthAt = parse(birthAt, 'yyyy-MM-dd', new Date());
            } catch (e) {
                throw new BadRequestException('Birth date is invalid');
            }
        }

        phone = getOnlyNumbers(phone);
        document = getOnlyNumbers(document);

        const user = await this.userService.create({
            name,
            email,
            password,
            birthAt: finalBirthAt,
            document,
            phone,
        });

        const token = await this.getToken(user.id);

        return { token };
    }
}
