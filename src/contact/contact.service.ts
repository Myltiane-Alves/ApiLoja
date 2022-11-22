import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation-number';

@Injectable()
export class ContactService {
    constructor(
        private prisma: PrismaService
    ){}

    async get(){
        const contacts = await this.prisma.contacts.findMany()
        return { message: "All Contacts ", contacts}
    }

    async getById(id: number){
        const contacts = await this.prisma.contacts.findUnique({
            where: {
                id: isValidNumber(id)
            }
        })

        return contacts;
    }

    async created({
        name,
        email,
        phone

    } : {
        name: string,
        email: string,
        phone: string,
    }){
        if(!name) {
            throw new BadRequestException("Name is required")
        }

        if(!email) {
            throw new BadRequestException("E-mail is required")
        }

        if(!phone) {
            throw new BadRequestException("Phone is required")
        }

        const contactCreated = await this.prisma.contacts.create({
            data: {
                name,
                email,
                phone
            }
        })

        return {message: "Contact created com sucess", contactCreated}
    }

    async remove(id: number){
        id = Number(id)

        const contacts = await this.prisma.contacts.delete({
            where: {
                id
            }
        })

        return { message: "Contacts remove sucess", contacts}
    }
 }
