import { Controller, Get, Param, Response } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller()
export class PhotoController {
    constructor(
        private photoService: PhotoService
    ){}

    @Get(':photo')
    async show(@Param('photo') photo, @Response({ passthrough: true }) res) {
        return this.photoService.getStreambleFile(photo, res);
    }
}
