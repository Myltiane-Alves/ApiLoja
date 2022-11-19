// import {
//     Controller,
//     Post,
//     Body,
//     ParseIntPipe,
//     UseGuards
// } from '@nestjs/common';
// import { InventoryService } from './inventory.service';
// import {CreateInventoryDto} from './dto/create-inventory.dto';
// import { User } from 'src/user/user.decorator';
// import { AuthGuard } from 'src/auth/auth.guard';
// @Controller('inventory')
// export class InventoryController {

//     constructor(
//         private inventoryService: InventoryService,
//     ) {}

//     @UseGuards(AuthGuard)
//     @Post('register')
//     async RegisterProduct(
//         @Body(ParseIntPipe) data: CreateInventoryDto,
//         // @User() user,

//     ) {
//         return this.inventoryService.create(data);
//         // return console.log(this.inventoryService.create(data));
//         // return await this.inventoryService.create(data);
//     }
// }
