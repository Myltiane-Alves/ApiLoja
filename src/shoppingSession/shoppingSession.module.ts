// import { ShoppingSessionController } from './shoppingsession.controller';
// import { ShoppingSessionService } from './shoppingsession.service';
// import { Module } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
// import { JwtModule } from '@nestjs/jwt';
// import { UserModule } from 'src/user/user.module';
// // import { AuthModule } from 'src/auth/auth.module';

// @Module({
//     imports: [
//         PrismaModule,
//         JwtModule.registerAsync({
//             useFactory: () => ({
//                 secret: process.env.JWT_SECRET,
//                 signOptions: {
//                     expiresIn: Number(process.env.JWT_EXPIRES_IN)
//                 }
//             })
//         }),
//         UserModule,
//         // AuthModule,
//     ],
//     controllers: [
//         ShoppingSessionController,],
//     providers: [
//         ShoppingSessionService,],
// })
// export class ShoppingSessionModule { }
