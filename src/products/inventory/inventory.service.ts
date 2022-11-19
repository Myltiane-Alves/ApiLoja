// import {
//     Injectable,
//     BadRequestException
// } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { isValidNumber } from 'src/utils/validation-number';
// import { CreateInventoryDto } from './dto/create-inventory.dto';

// @Injectable()
// export class InventoryService {

//     constructor(
//         private prisma: PrismaService,
//     ) {}

//     async get(){}

//     async getById(){}

//     async create({
//         quantity,
//         inventoryId,
//         categoryId,
//         discountId,
//     } : CreateInventoryDto){

//         inventoryId = isValidNumber(inventoryId);
//         categoryId = isValidNumber(categoryId);
//         discountId = isValidNumber(discountId);



//         const inventory = await this.prisma.productinventory.findUnique({
//             where: {
//                 id: inventoryId,
//             },
//         })

//         if(!inventory) {
//             throw new BadRequestException("Inventory not found.");
//         }

//         const category = await this.prisma.productcategory.findUnique({
//             where: {
//                 id: categoryId,
//             },
//         });

//         if(!category) {
//             throw new BadRequestException("Category not found.");
//         }

//         const discount = await this.prisma.discount.findUnique({
//             where: {
//                 id: discountId,
//             },
//         });

//         if(!discount) {
//             throw new BadRequestException("Discount not found.");
//         }

//         const inventoryCreated = await this.prisma.productinventory.create({
//             data: {
//                 quantity,
//                 categoryId,
//                 discountId,

//             }
//         })

//         return console.log(inventoryCreated);
//         // return inventoryCreated;
//     }

//     async update(){}

//     async delete(){}
// }
