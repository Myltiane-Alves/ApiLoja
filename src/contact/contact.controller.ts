import { Controller, UseGuards, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteDateColumn } from 'typeorm';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
    constructor(
        private contactService: ContactService
    ){}

    @UseGuards(AuthGuard)
    @Get()
    async get() {
        return this.contactService.get()
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.contactService.getById(id)
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Body('name') name,
        @Body('email') email,
        @Body('phone') phone,

    ) {

        return this.contactService.created({
            name,
            email,
            phone
        })
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.contactService.remove(id)
    }
}
