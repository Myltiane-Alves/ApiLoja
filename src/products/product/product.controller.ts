import {
    Controller,
    Post,
    Patch,
    Body,
    Get,
    UseGuards,
    Param,
    Delete
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('produtos')
export class ProductController {

    constructor(
        private productService: ProductService,
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
}
