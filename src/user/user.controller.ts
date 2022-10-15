import { Controller, Post, Body,Get, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController { 
    constructor(private userService: UserService) {}

    @Get()
    async showByEmail(@Query('email') email) {
        return this.userService.getByEmail(email)
    }
    
    @Post('register')
    async register(
        @Body('userName') userName,
        @Body('password') password,
        @Body('email') email,
        @Body('name') name,
        @Body('phone') phone,
    ) {
        return await this.userService.register({
            userName,
            password,
            email,
            name,
            phone,
        });
    }
}
