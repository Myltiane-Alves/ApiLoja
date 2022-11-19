import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
    ) {}

    @Post('register')
    async RegisterProduct(
        @Body('name') name,
        @Body('description') description,

    ) {
        return this.categoryService.create({
            name,
            description,
        });

    }
}
