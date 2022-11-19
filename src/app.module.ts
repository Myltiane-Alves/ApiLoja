import { CategoryModule } from './products/category/category.module';
import { InventoryModule } from './products/inventory/inventory.module';
import { ProductModule } from './products/product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        CategoryModule,
        InventoryModule,
        ProductModule,
        AuthModule,
        UserModule,
        PrismaModule,],
    controllers: [],
    providers: [],
})
export class AppModule { }
