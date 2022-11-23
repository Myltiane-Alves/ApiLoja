import { Controller, UseGuards, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
    constructor(
        private contactService: ContactService
    ){}


    @Get()
    async get() {
        return this.contactService.get()
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.contactService.getById(id)
    }


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


    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.contactService.remove(id)
    }
}
