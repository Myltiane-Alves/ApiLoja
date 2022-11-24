import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRES_IN)
                },
            }),
        }),
        PrismaModule,
        UserModule,
        PhotoModule,

    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ],
    exports: [ JwtModule, AuthService]
})
export class AuthModule { }
