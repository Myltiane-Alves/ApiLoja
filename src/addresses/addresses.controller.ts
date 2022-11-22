import {
    Controller,
    Get,
    Param,
    UseGuards,
    Post,
    Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdressesService} from './addresses.service'
import { CreateAddressDto } from './dto/create-addresses-dto';
@Controller('addresses')
export class AddressesController {

    constructor(
        private addressesService: AdressesService,
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return this.addressesService.get();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.addressesService.getById(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async created(
        @Body('street') street,
        @Body('number') number,
        @Body('complement') complement,
        @Body('district') district,
        @Body('city') city,
        @Body('state') state,
        @Body('zipCode') zipCode,
        @Body('country') country,
        @Body('phone') phone,
        @Body('phoneMobile') phoneMobile,
        @Body() user
    ) {
        return console.log(this.addressesService.create(user.personId, {
            street,
            number,
            complement,
            district,
            city,
            state,
            zipCode,
            country,
            phone,
            phoneMobile,

        }))

        // return this.addressesService.create(user.id, {
        //     street,
        //     number,
        //     complement,
        //     district,
        //     city,
        //     state,
        //     zipCode,
        //     country,
        //     phone,
        //     phoneMobile,
        // });

        // return { message: 'Address created', address };

    }

    @Get('/cep/:cep')
    async cep(@Param('cep') cep: string) {
       return this.addressesService.searchCep(cep)
    }
}
