import { Controller, Post, Body,Get, Query, Delete, HttpCode, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController { 
    constructor(private userService: UserService) {}

    // @Get()
    // async showByEmail(@Query('email') email) {
    //     return this.userService.getByEmail(email)
    // }

    @Get()
    async show(@Query('id') id) {
        return this.userService.get(id)
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

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id) {
        await this.userService.delete(id);
    }
}
