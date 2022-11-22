import { Controller, Get, Param } from '@nestjs/common';
import { AdressesService } from './addresses.service';

@Controller('addresses/zip-code')
export class ZipcodeController {
    constructor(
        private addressesService: AdressesService,
    ) {}

    @Get('/:zipCode')
    async cep(@Param('zipCode') zipCode: string) {
        return this.addressesService.searchCep(zipCode);
    }
 }
