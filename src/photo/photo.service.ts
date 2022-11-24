import { Injectable, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { ProductService } from 'src/products/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PhotoService {

    constructor(
        private userService: UserService,
        private productService: ProductService,
    ){}

    async getStreambleFile(path: string, response: Response){
        let filePath = this.userService.getStoragePhotoPath(path);
        let imagePath = this.productService.getStoragePhotoPath(path);

        if(!existsSync(filePath)) {
            filePath = this.userService.getStoragePhotoPath('../nophoto.png');
            imagePath = this.productService.getStoragePhotoPath('../nophoto.png');
        }

        const file = createReadStream(filePath) || createReadStream(imagePath);
        // const image = createReadStream(imagePath);

        let mimetype = '';

        switch (filePath.split('.').pop().toLocaleLowerCase()) {
            case 'png':
                mimetype = 'image/png';
                break;
            case 'jpg':
            case 'jpeg':
                default:
                    mimetype = 'image/jpg';

        }
        switch (imagePath.split('.').pop().toLocaleLowerCase()) {
            case 'png':
                mimetype = 'image/png';
                break;
            case 'jpg':
            case 'jpeg':
                default:
                    mimetype = 'image/jpg';

        }

        response.set({
            'Content-Type': mimetype,
        });

        return new StreamableFile(file)
    }

}
