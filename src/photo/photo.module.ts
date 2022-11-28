import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import {  forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';


@Module({
    imports: [ forwardRef(() =>  UserModule)],
    controllers: [PhotoController],
    providers: [PhotoService],
    exports: [PhotoService],
})
export class PhotoModule { }
