import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/products/product/product.module';


@Module({
    imports: [UserModule, ProductModule],
    controllers: [PhotoController,],
    providers: [PhotoService,],
    exports: [PhotoService,],
})
export class PhotoModule { }
