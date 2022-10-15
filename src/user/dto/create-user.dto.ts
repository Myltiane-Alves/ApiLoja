import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
   
    @IsString()
    @IsNotEmpty()
    userName: string;
   
    @IsString()
    password: string;

    @IsString()
    email: string;
    
    @IsString()
    name: string;
    
    @IsString()
    phone: string;
    
}