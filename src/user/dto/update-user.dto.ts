import {
    IsDateString,
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    IsEmail
} from "class-validator";
import { CreateUsersDto } from "./create-user.dto";
import { PartialType } from '@nestjs/mapped-types';
export class UpdateUserDto extends PartialType(CreateUsersDto) {

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsDateString()
    birthAt: Date;


    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(19)
    phone: string;

    @IsOptional()
    @IsString()
    @MinLength(11)
    @MaxLength(19)
    document: string;

}
