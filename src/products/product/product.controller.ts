import {
    Controller,
    Post,
    Put,
    Body,
    ParseIntPipe,
    UseGuards
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
}
