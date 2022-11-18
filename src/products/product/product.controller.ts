import {
    Controller,
    Post,
    Put,
    Body,
    ParseIntPipe
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
    ) {}

    @Post('register')
    async registerProduct(
        @Body(ParseIntPipe) data: CreateProductDto,
        @User() user,
    ) {

        return await this.productService.create(user.personId, data);

    }
}
