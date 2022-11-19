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

    async get(){
        const products = await this.prisma.product.findMany();
        return { message: 'Products', products };
    }

    async getById(id: number){
        const product = await this.prisma.product.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });

        return product;
    }

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

    async updated(id: number, {
        name,
        description,
        price,
        quantity,
    } : {
        name: string;
        description: string;
        price: string;
        quantity: string;
    }){
        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('Id is required');
        }


        const product = await this.prisma.product.update({
            where: {
                id: isValidNumber(id),
            },
            data: {
                name,
                description,
                price,
                quantity,
            },
        });

        return { message: 'Product updated', product };
    }

    async delete(id: number){
        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('Id is required');
        }

        const productDeleted = await this.prisma.product.delete({
            where: {
                id: isValidNumber(id),
            },
        });

        return { message: 'Product deleted', productDeleted };
    }
}
