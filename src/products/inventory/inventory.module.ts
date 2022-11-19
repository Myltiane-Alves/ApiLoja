// import { InventoryController } from './inventory.controller';
// import { InventoryService } from './inventory.service';
// import { Module } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
// import { UserModule } from 'src/user/user.module';
// import { AuthModule } from 'src/auth/auth.module';
// import { JwtModule } from '@nestjs/jwt';
// import { DiscountModule } from '../discount/discount.module';
// import { CategoryModule } from '../category/category.module';

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
//         AuthModule,
//         UserModule,
//         DiscountModule,
//         CategoryModule,
//     ],
//     controllers: [
//         InventoryController,],
//     providers: [
//         InventoryService,],
// })
// export class InventoryModule { }
