import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,

} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.categoryService.get();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.categoryService.getById(id);
    }


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

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name,
        @Body('description') description,
    ) {
        return this.categoryService.updated(id, {
            name,
            description,
        });
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.categoryService.delete(id);
    }
}
