import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/products/product/product.service';
import { isValidNumber } from 'src/utils/validation-number';

@Injectable()
export class CartItemService {
    constructor(
        private prisma: PrismaService,
        private product: ProductService
    ){}

    async get (){
        const cart = await this.prisma.cartitem.findMany()

        return { message: 'cartItems', cart}
    }

    async created ( {
        quantity,
        sessionId,
        productId,
    } : {
        quantity: number,
        sessionId: number,
        productId: number,
    }){


        sessionId = isValidNumber(sessionId)
        productId = isValidNumber(productId)

        const session = await this.prisma.shoppingsession.findUnique({
            where: {
                id: sessionId
            }
        })

        if(!session) {
            throw new NotFoundException("Session not found")
        }

        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        console.log(this.prisma.product.findUnique({
                where: { id: productId }}))

        if(!product) {
            throw new NotFoundException("Product not Found")
        }

        if(!quantity) {
            throw new BadRequestException(" need to add a product quantity")
        }

        const cartCreated = await this.prisma.cartitem.create({
            data: {
                quantity,
                sessionId,
                productId
            }
        })

       return  console.log({
            quantity,
            sessionId,
            productId
        })

        return { message: "Cart created succes", cartCreated}
    }
}
