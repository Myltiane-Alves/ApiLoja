import {
    Controller,
    Post,
    Body
} from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {

    constructor(
        private inventoryService: InventoryService,
    ) {}

    @Post('register')
    async RegisterProduct(
        @Body('name') quantity,

    ) {
        return await this.inventoryService.create(data);
    }
}
