import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

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
        }),
        AuthModule,
        UserModule
    ],
    controllers: [DiscountController],
    providers: [DiscountService],
})
export class DiscountModule { }
