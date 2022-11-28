import { Controller, Get, Param, Response } from '@nestjs/common';
import { ProductPhotoService } from './productPhoto.service';

@Controller()
export class ProductPhotoController {
    constructor(
        private productPhotoService: ProductPhotoService,
    ){}

    @Get(':photo')
    async show(@Param('photo') photo, @Response({ passthrough: true }) res) {
        return this.productPhotoService.getStreambleFile(photo, res);
    }
 }
