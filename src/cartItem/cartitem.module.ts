import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductModule } from 'src/products/product/product.module';
import { UserModule } from 'src/user/user.module';
import { CartItemController } from './cartitem.controller';
import { CartItemService } from './cartitem.service';

@Module({
    imports: [
        PrismaModule,
        ProductModule,
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
    controllers: [
        CartItemController
    ],
    providers: [
        CartItemService
    ],
    exports: [
        CartItemService
    ]
})
export class CartItemModule {}
