import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductModule } from 'src/products/product/product.module';

@Module({
    imports: [
        PrismaModule,
        ProductModule
    ],
    controllers: [
        PaymentController,],
    providers: [
        PaymentService,],
})
export class PaymentModule { }
