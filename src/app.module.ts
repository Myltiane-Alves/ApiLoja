import { AdressesService } from './addresses/addresses.service';
import { AddressesModule } from './addresses/addresses.module';
import { DiscountController } from './products/discount/discount.controller';
import { DiscountService } from './products/discount/discount.service';
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
    ],
    providers: [
        AdressesService,
    ],
})
export class AppModule { }
