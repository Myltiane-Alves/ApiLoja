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
    async create(personId: number, {
        name,
        description,
        image,
        price,
        quantity,
        categoryId,
        inventoryId,
        discountId,
    }:  CreateProductDto  ){

        categoryId = isValidNumber(categoryId);
        inventoryId = isValidNumber(inventoryId);
        discountId = isValidNumber(discountId);


        const category = await this.prisma.productcategory.findUnique({
            where: {
                id: categoryId,
            },
        });

        if(!category) {
            throw new BadRequestException("Category not found.");
        }

        const inventory = await this.prisma.productinventory.findUnique({
            where: {
                id: inventoryId,
            },
        });

        if(!inventory) {
            throw new BadRequestException("Inventory not found.");
        }

        const discount = await this.prisma.discount.findUnique({
            where: {
                id: discountId,
            },
        });

        if(!discount) {
            throw new BadRequestException("Discount not found.");
        }

        if(!name) {
            throw new BadRequestException('Name is required');
        }

        if(!description) {
            throw new BadRequestException('Description is required');
        }

        if(!price) {
            throw new BadRequestException('Price is required')
        }

        const productCreated = await this.prisma.product.create({
            data: {
                name,
                description,
                image,
                price,
                quantity,
                categoryId,
                inventoryId,
                discountId,
            },
            // include: {
            //     productcategory: true,
            //     productinventory: true,
            //     discount: true,
            // }
        })

        return productCreated;
    }

    async update(){}
    async delete(){}
}
