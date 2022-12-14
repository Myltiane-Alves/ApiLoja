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
import { User } from 'src/user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { Product } from './product.decorator';
import { ProductPhotoService } from '../productPhoto/productPhoto.service';

@Controller('produtos')
export class ProductController {

    constructor(
        private productService: ProductService,
        private productPhotoService: ProductPhotoService,
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
        return this.productService.updated(id,{
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

    @UseInterceptors(
        FileInterceptor('file', {
            dest: './productStorage/image',
            limits: {
                fileSize: 50 * 1024 * 1024,
                files: 1,
            },
        }),

    )
    @UseGuards(AuthGuard)
    @Put('image')
    async setPhoto(
        @User() user,
        @UploadedFile() file: Express.Multer.File) {
        // return this.productService.setPhoto(product.id, file);
        return console.log(this.productService.setPhoto(user.id, file))
    }


    @UseGuards(AuthGuard)
    @Get('image')
    getProductPhoto(
        @Response({ passthrough: true }) res,
        @Product('image') image: string,
    ) {
        return this.productPhotoService.getStreambleFile(image, res);
    }
}


