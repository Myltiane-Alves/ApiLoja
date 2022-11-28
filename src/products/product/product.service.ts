//@ts-check
import {
    Injectable ,
    BadRequestException,
} from '@nestjs/common';
import { prisma } from '@prisma/client';
import { createReadStream, existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';
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
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('Id is required');
        }

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
        // image
    } : {
        name: string;
        description: string;
        price: string;
        quantity: string;
        // image: string;
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

    getStoragePhotoPath(image: string){

        if(!image) {
            throw new BadRequestException("Image is required")
        }

        return join(__dirname, '../', '../', '../', 'ProductStorage', 'image', image);
        // return join(__dirname, '../../../storage/photos', image);
    }

    async removePhoto(productId: number){
        const { id, image } = await this.getById(productId);

        if(image) {

            const currentImage = this.getStoragePhotoPath(image);

            if(existsSync(currentImage)) {
                unlinkSync(currentImage);
            }
        }

        return this.prisma.product.update({
            where: {
                id,
            },
            data: {
                image: null,
            }
        });
    }


    async setPhoto(id: number, file: Express.Multer.File) {
        if(!file) {
            throw new BadRequestException("File is required.");
        }

        if(!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            throw new BadRequestException("Invalid file type.");
        }

        await this.removePhoto(id);

        let ext = '';

        switch (file.mimetype) {
            case 'image/png':
                ext = 'png';
                break;
            default:
                ext = 'jpg';
        }

        const image = `${file.filename}.${ext}`;
        const from = this.getStoragePhotoPath(file.filename)
        const to =  this.getStoragePhotoPath(image)

        renameSync(from, to);

        return this.prisma.product.update({
            where: {
                id,
            },
            data: {
                image,
            },
        });

    }

    async getPhoto(id: number){
        const { image } = await this.getById(id);

        let filePath = this.getStoragePhotoPath('../nophoto.png');

        if(image) {
            filePath = this.getStoragePhotoPath(image);
        }

        const file = createReadStream(filePath)

        const extension = filePath.split('.').pop();

        return {
            file,
            extension
        };
    }
}
