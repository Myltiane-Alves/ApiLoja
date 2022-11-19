import {
    Injectable ,
    BadRequestException,
} from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation-number';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {

    constructor(
        private prisma: PrismaService,

    ) { }

    async get(){}
    async getById(){}
    async create({
        name,
        description,
        price,
        quantity,
    }:  {
        name: string;
        description: string;
        price: string;
        quantity: string;
    }  ){

        if(!name) {
            throw new BadRequestException('Name is required');
        }

        if(!description) {
            throw new BadRequestException('Description is required Entrou aqui');
        }

        if(!price) {
            throw new BadRequestException('Price is required')
        }

        if(!quantity) {
            throw new BadRequestException('Quantity is required')
        }

        const productCreated = await this.prisma.product.create({
            data: {
                name,
                description,
                price,
                quantity,
            },
        })

        return productCreated;
    }

    async update(){}
    async delete(){}
}
