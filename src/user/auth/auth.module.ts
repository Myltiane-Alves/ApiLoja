import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PrismaModule, 
        UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions:{
                    expiresIn: Number(process.env.JWT_EXPIRES_IN)
                }
            })
        })
        
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,],
})
export class AuthModule { }
