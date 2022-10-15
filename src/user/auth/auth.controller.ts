import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register(data: CreateUserDto) {
        return await this.userService.register(data);
    }
    
}
