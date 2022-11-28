import { ProductPhotoService } from './productPhoto.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { ProductPhotoController } from './productPhoto.controller';

@Module({
    imports: [ProductModule],
    controllers: [ProductPhotoController],
    providers: [ProductPhotoService],
    exports:[ProductPhotoService]
})
export class ProductPhotoModule { }
