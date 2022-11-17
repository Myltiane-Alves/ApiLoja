import { Controller, Post, Body,Get, Query, Delete, HttpCode, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController { 
    
    constructor(private userService: UserService) {}
    
    @Get(':id')
    async show(@Param('id') id) {
        return this.userService.get(id)
    }
    
    @Get()
    async showByEmail(@Query('email') email) {
        return this.userService.getByEmail(email)
    }
    

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id) {
        await this.userService.delete(id);
    }
}
