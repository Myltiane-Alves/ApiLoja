import { Injectable, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';

import { ProductService } from '../product/product.service';

@Injectable()
export class ProductPhotoService {
    constructor(
        private productService: ProductService,
    ){}

    async getStreambleFile(path: string, response: Response){
        let filePath = this.productService.getStoragePhotoPath(path);

        if(!existsSync(filePath)) {
            filePath = this.productService.getStoragePhotoPath('../nophoto.png');
        }

        const file = createReadStream(filePath);

        let mimeType = '';

        switch (filePath.split('.').pop().toLocaleLowerCase()) {
            case 'png':
                mimeType = 'image/png';
                break;
            case 'jpg':
            case 'jpeg':
                default:
                    mimeType = 'image/jpg';

        }

        response.set({
            'Content-Type': mimeType,
        })

        return new StreamableFile(file)
    }
}
