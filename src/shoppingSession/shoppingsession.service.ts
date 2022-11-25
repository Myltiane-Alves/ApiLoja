// import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { isValidNumber } from 'src/utils/validation-number';
// import { CreateSessionDto } from './dto/create-session-dto';

// @Injectable()
// export class ShoppingSessionService {
//     constructor(
//         private prisma: PrismaService,

//     ){}

//     async get() {
//         return this.prisma.shoppingsession.findMany()
//     }

//     async create(personId: number,  {
//         total,
//     }: CreateSessionDto){

//         if(isNaN(Number(personId))) {
//             throw new BadRequestException("Person ID is required entrou aqui")
//         }
//         // if(!total) {
//         //     throw new BadRequestException('total is required');
//         // }

//         // userId = isValidNumber(userId)

//         // const user = await this.prisma.user.findUnique({
//         //     where:{
//         //         id: userId
//         //     }
//         // })

//         // if(!user) {
//         //     throw new NotFoundException("User not found")
//         // }


//         const shoppingSessionCreated = await this.prisma.shoppingsession.create({
//             data: {
//                 total,
//                 personId: isValidNumber(personId)

//             }

//         })

//         // return console.log(shoppingSessionCreated)
//         return { message: "Shopping Session Created", shoppingSessionCreated}
//     }
// }
