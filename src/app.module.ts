import { PhotoModule } from './photo/photo.module';
// import { ShoppingSessionModule } from './shoppingSession/shoppingSession.module';

import { CartItemModule } from './cartItem/cartitem.module';
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
import { CartItemController } from './cartItem/cartitem.controller';

@Module({
    imports: [
        // PhotoModule,
        // ShoppingSessionModule,
        CartItemModule,
        PaymentModule,
        ContactModule,
        AddressesModule,
        DiscountModule,
        // CategoryModule,
        // InventoryModule,
        ProductModule,
        AuthModule,
        UserModule,
        PrismaModule,
    ],
    controllers: [
        CartItemController,
        ZipcodeController,
    ],
    providers: [


    ],
})
export class AppModule { }
