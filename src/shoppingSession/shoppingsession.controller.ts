import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { totalmem, userInfo } from 'os';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateSessionDto } from './dto/create-session-dto';
import { ShoppingSessionService } from './shoppingsession.service';

@Controller('session')
export class ShoppingSessionController {
    constructor(
        private shoppingService: ShoppingSessionService
    ){}

    @Get()
    async getAll() {
        return this.shoppingService.get()
    }

    @UseGuards(AuthGuard)
    @Post('create')
    async register(
        @Body('total') total,
        @User() user,
    ) {
        return this.shoppingService.create(user.personId, total)

    //    return console.log(this.shoppingService.create(user.personId, total))

    }
}
