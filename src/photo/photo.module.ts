import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/products/product/product.module';


@Module({
    imports: [
        // UserModule,
        // ProductModule
        forwardRef(() =>  UserModule),
        forwardRef(() =>  ProductModule)
    ],
    controllers: [PhotoController,],
    providers: [PhotoService,],
    exports: [PhotoService,],
})
export class PhotoModule { }
