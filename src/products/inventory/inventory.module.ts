import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        InventoryController,],
    providers: [
        InventoryService,],
})
export class InventoryModule { }
