import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation-number';

@Injectable()
export class ContactService {
    constructor(
        private prisma: PrismaService
    ){}

    async get(){
        const contacts = await this.prisma.contact.findMany()
        return { message: "All Contacts ", contacts}
    }

    async getById(id: number){
        const contacts = await this.prisma.contact.findUnique({
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

        let personId: number;

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                personId: true,
            },
        });

        if(user) {

        } else {

            const contact = await this.prisma.contact.findFirst({
                where: {
                    email,
                },
            });

            if(contact) {
                personId = Number(contact.personId);
            } else {
                const newPerson = await this.prisma.person.create({
                    data: {
                        name,
                    }
                })

                personId = Number(newPerson.id)
            }
        }


        return this.prisma.contact.create({
            data: {
                personId,
                name,
                email,
                phone
            },
        });
    }

    async remove(id: number){
        id = Number(id)

        const contacts = await this.prisma.contact.delete({
            where: {
                id
            }
        })

        return { message: "Contacts remove sucess", contacts}
    }
 }
