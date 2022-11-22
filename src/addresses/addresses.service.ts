import {
    Injectable,
    BadRequestException,
    NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation-number';
import { CreateAddressDto } from './dto/create-addresses-dto';
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdressesService {


    constructor(
        private prisma: PrismaService,
        private httpService: HttpService,
    ) { }

    async get() {
        return this.prisma.address.findMany()

    }

    async getById(id: number) {
        const address = await this.prisma.address.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });
        if (!address) {
            throw new NotFoundException('Address not found.');
        }

        return address;
    }


    async getAllByUser(userId: number) {
        return this.prisma.address.findMany({
            where: {
                person: {
                    user: {
                        some: {
                            id: isValidNumber(userId),
                        },
                    },
                },

            },
        });
    }

    async isValidPerson(id: number, personId: number) {
        personId = isValidNumber(personId);

        const address = await this.getById(isValidNumber(id));

        if (address.personId !== personId) {
            throw new NotFoundException('Address not found');
        }
    }

    async findByPerson(personId: number) {
        return this.prisma.address.findMany({
           where: {
              personId: isValidNumber(personId),
           },
        });
     }

    async create(personId: number, {
        street,
        number,
        complement,
        district,
        city,
        state,
        zipCode,
        country,
        phone,
        phoneMobile,

    }: CreateAddressDto) {

        // const { personId } = await this.prisma.user.findUnique({
        //     where: {
        //         id: isValidNumber(userId),
        //     },
        //     select: {
        //         personId: true,
        //     }
        // });

        // if(!personId) {
        //     throw new NotFoundException('Person not found');
        // }
        // if(isNaN(personId)) {
        //     throw new NotFoundException('Person not found');
        // }
        personId = Number(personId);
        return this.prisma.address.create({
            data: {
                street,
                number,
                complement,
                district,
                city,
                state,
                zipCode,
                country,
                phone,
                phoneMobile,
                personId,



            },

        })
    }
    async updated() {

    }
    async delete() {

    }

    async searchCep(cep: string) {
        cep = cep.replace(/[^\d]+/g, '').substring(0, 8);

        try {
            const response = await lastValueFrom(
                this.httpService.request({
                    method: 'GET',
                    url: `https://viacep.com.br/ws/${cep}/json/`,
                })
            )

            return response.data;
        } catch (e) {
            throw new BadRequestException('CEP not found');
        }
    }
}
