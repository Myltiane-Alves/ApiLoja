import { PaymentModule } from './payment/payment.module';
import { ContactModule } from './contact/contact.module';
import { ZipcodeController } from './addresses/zipcode.controller';
import { AddressesModule } from './addresses/addresses.module';
import { DiscountModule } from './products/discount/discount.module';
import { CategoryModule } from './products/category/category.module';
// import { InventoryModule } from './products/inventory/inventory.module';
import { ProductModule } from './products/product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        PaymentModule,
        ContactModule,
        AddressesModule,
        DiscountModule,
        CategoryModule,
        // InventoryModule,
        ProductModule,
        AuthModule,
        UserModule,
        PrismaModule,
    ],
    controllers: [
        ZipcodeController,
    ],
    providers: [

    ],
})
export class AppModule { }
