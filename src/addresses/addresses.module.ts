import { AddressesController } from './addresses.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdressesService } from './addresses.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PrismaModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRES_IN)
                }
            })
        })
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
