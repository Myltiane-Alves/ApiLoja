import { IsNotEmpty } from "class-validator";

export class CreateInventoryDto {

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    inventoryId: number;

    @IsNotEmpty()
    discountId: number;
}
