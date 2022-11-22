import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartItemService } from './cartitem.service';

@Controller('cart')
export class CartItemController {

    constructor(
        private cartService: CartItemService
    ){}

    @Get()
    async getAll() {
        return this.cartService.get()
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Body('quantity') quantity,

    ) {
        const cart = await this.cartService.created(quantity)
    }
}