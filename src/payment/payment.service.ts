import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/products/product/product.service';

@Injectable()
export class PaymentService {

    constructor(
        private prisma: PrismaService,
        private product: ProductService
    ){}

    async get(){}
    async getById(){}
    async create(){}
    async update(){}
    async remove(){}

 }
