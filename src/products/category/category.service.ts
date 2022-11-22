
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation-number';

@Injectable()
export class CategoryService {

    constructor(
        private prisma: PrismaService,

    ) { }

    async get(){
        const categories = await this.prisma.productCategory.findMany();
        return { message: 'Categories', categories };
    }

    async getById(id: number){
        const category = await this.prisma.productCategory.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });

        return category;
    }

    async create({
        name,
        description,
    }: {
        name: string;
        description: string;
    }){

        if(!name){
            throw new BadRequestException('Name is required entrou aqui');
        }

        if(!description){
            throw new BadRequestException('Description is required');
        }

        const productcategoryCreated = await this.prisma.productCategory.create({
            data: {
                name,
                description,
            }
        });

        return {message: "Category registered successfully", productcategoryCreated};

    }

    async updated(id: number, {
        name,
        description,
    }: {
        name: string;
        description: string;
    }){
        const category = await this.prisma.productCategory.update({
            where: {
                id: isValidNumber(id),
            },
            data: {
                name,
                description,
            }
        });

        return {message: "Category updated successfully", category};
    }

    async delete(id: number){
        id = isValidNumber(id);

        if(isNaN(id)){
            throw new BadRequestException('Id is required');
        }

        const category = await this.prisma.productCategory.delete({
            where: {
                id: isValidNumber(id),
            }
        });

        return {message: "Category deleted successfully", category};
    }
 }
