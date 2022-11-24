import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports: [UserModule,],
    controllers: [PhotoController,],
    providers: [PhotoService,],
    exports: [PhotoService,],
})
export class PhotoModule { }
