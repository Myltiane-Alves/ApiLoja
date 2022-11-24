import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSessionDto {
    @IsNotEmpty({
        message: 'não pode ser vazio'
    })
    @IsString()
    total: string;
}
