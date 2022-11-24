import {
    Controller,
    Post,
    Patch,
    Body,
    Get,
    UseGuards,
    Param,
    Delete,
    UseInterceptors,
    Put,
    UploadedFile,
    Response
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PhotoService } from 'src/photo/photo.service';
import { User } from 'src/user/user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductService } from './product.service';
import { Product } from './product.decorator';

@Controller('produtos')
export class ProductController {

    constructor(
        private productService: ProductService,
        private photoService: PhotoService,
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.productService.get();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.productService.getById(id);
    }


    @UseGuards(AuthGuard)
    @Post()
    async registerProduct(
        @Body('name') name,
        @Body('description') description,
        @Body('price') price,
        @Body('quantity') quantity,
    ) {

        const product = await this.productService.create({
            name,
            description,
            price,
            quantity,
        });
        return product;

    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name,
        @Body('description') description,
        @Body('price') price,
        @Body('quantity') quantity,
    ) {
        return this.productService.updated(id, {
            name,
            description,
            price,
            quantity,
        });
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            dest: './storage/photos',
            limits: {
                fileSize: 50 * 1024 * 1024,
                files: 1,
            },
        }),
    )
    @Put('productImage')
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Product() product) {
        return this.productService.setPhoto(product.id, file);
    }

    @UseGuards(AuthGuard)
    @Get('photo')
    getProductPhoto(
        @Response({ passthrough: true }) res,
        @User('photo') photo: string,
    ) {
        return this.photoService.getStreambleFile(photo, res);
    }
}
