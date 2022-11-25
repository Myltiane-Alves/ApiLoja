import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PhotoModule } from 'src/photo/photo.module';
import { AuthService } from 'src/auth/auth.service';

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
        forwardRef(() => PhotoModule),
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule)

    ],
    controllers: [
        ProductController,],
    providers: [
        ProductService,],
    exports: [
        ProductService,

    ]
})
export class ProductModule { }
