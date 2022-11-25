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

        if(!existsSync(filePath)) {
            filePath = this.userService.getStoragePhotoPath('../nophoto.png');
        }

        const file = createReadStream(filePath);

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

        response.set({
            'Content-Type': mimetype,
        });

        return new StreamableFile(file)
    }
    async getStreambleImage(path: string, response: Response){

        let filePath = this.productService.getStoragePhotoPath(path);

        if(!existsSync(filePath)) {
            filePath = this.productService.getStoragePhotoPath('../nophoto.png');
        }

        const file = createReadStream(filePath);

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

        response.set({
            'Content-Type': mimetype,
        });

        return new StreamableFile(file)
    }

}
