
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor(
        private prisma: PrismaService,

    ) { }

    async get(){}

    async getById(){}

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

        const productcategoryCreated = await this.prisma.productcategory.create({
            data: {
                name,
                description,
            }
        });

        return productcategoryCreated;

    }

    async update(){}

    async delete(){}
 }