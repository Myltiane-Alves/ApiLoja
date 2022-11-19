import { Body, Controller, Post } from '@nestjs/common';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
    constructor(
        private discountService: DiscountService,

    ) { }

    @Post('register')
    async RegisterProduct(
        @Body('name') name,
        @Body('description') description,
        @Body('discountPorcent') discountPorcent,

    ) {
        return this.discountService.create({
            name,
            description,
            discountPorcent,
        });
    }
}
