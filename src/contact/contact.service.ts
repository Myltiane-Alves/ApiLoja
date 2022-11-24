import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation-number';

@Injectable()
export class ContactService {
    constructor(
        private prisma: PrismaService
    ){}

    async get(){
        const contact = await this.prisma.contacts.findMany()
        return { message: "All Contacts ", contact}
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
        phone,
        message

    } : {
        name: string,
        email: string,
        phone: string,
        message: string,
    }){
        if(!name) {
            throw new BadRequestException("Name is required")
        }

        if(!email) {
            throw new BadRequestException("E-mail is required")
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
            personId = Number(user.personId);
        } else {
            const contact = await this.prisma.contacts.findFirst({
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
                    },
                })

                personId = Number(newPerson.id)
            }
        }


        const contato = await this.prisma.contacts.create({
            data: {
                name,
                email,
                phone,
                message,
                personId
            },

        });

        return contato;
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
