import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscountService {
    constructor(
        private prisma: PrismaService,

    ) { }

    async get(){}

    async getById(){}

    async create({
        name,
        description,
        discountPorcent,
    }: {
        name: string;
        description: string;
        discountPorcent: number;
    }){

        if(!name){
            throw new BadRequestException('Name is required ');
        }

        if(!description){
            throw new BadRequestException('Description is required');
        }

        if(!discountPorcent){
            throw new BadRequestException('Description is required');
        }

        const discountCreated = await this.prisma.discount.create({
            data: {
                name,
                description,
                discountPorcent,
            }
        });

        return discountCreated;

    }

    async update(){}

    async delete(){}
}
