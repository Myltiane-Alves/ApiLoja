import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService    
    ) {}

    @Post()
    async verifyEmail(@Body('email') email){
        try {
            await this.userService.getByEmail(email);
            return { exists: true };
        } catch (e) {
            return { exists: false };
        }
    }

    @Post('register')
    async register(data: CreateUserDto) {
        return await this.userService.register(data);
    }

    @Post('login') 
    async login(@Body('email') email, @Body('password') password) {
        return await this.authService.login(email, password);
    }
    
}
