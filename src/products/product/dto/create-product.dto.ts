import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    inventoryId: number;

    @IsNotEmpty()
    discountId: number;
}
