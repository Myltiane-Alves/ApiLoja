import { AddressesController } from './addresses.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdressesService } from './addresses.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRES_IN)
                }
            })
        }),
        PrismaModule,
        AuthModule,
        UserModule,
        HttpModule
    ],
    controllers: [
        AddressesController,],
    providers: [
        AdressesService,
    ],
    exports: [
        AdressesService
    ]
})
export class AddressesModule { }
