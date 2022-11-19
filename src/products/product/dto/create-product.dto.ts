import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    quantity: string;

    @IsNotEmpty()
    image: string;
}
