import { IsNotEmpty, IsOptional, IsString, MaxLength,
    MinLength, } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty({
        message: 'A rua é obrigatória',
    })
    @IsString()
    street: string;

    @IsOptional()
    @IsString()
    number: string;

    @IsOptional()
    @IsString()
    complement: string;

    @IsNotEmpty()
    @IsString()
    district: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    @MinLength(8)
    zipCode: string;

    @IsNotEmpty()
    phone: string;

    @IsString()
    phoneMobile: string;
}
