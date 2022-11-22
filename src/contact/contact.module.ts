import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        UserModule
    ],
    controllers: [
        ContactController,],
    providers: [
        ContactService,],
})
export class ContactModule { }
