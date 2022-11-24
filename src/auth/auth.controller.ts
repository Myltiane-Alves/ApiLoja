import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    BadRequestException,
    UseGuards,
    UploadedFile,
    UseInterceptors,
    Response
} from '@nestjs/common';
import { parse } from 'date-fns';
import { User } from 'src/user/user.decorator';
// import { CreateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';
import { Auth } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from 'src/photo/photo.service';
import { dateStringToDate } from 'src/utils/dateStringToDate';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private photoService: PhotoService,
    ) {}

    @Post()
    async verifyEmail(@Body('email') email){
        try {
            await this.userService.getByEmail(email);
            return { exists: true };
        } catch (e) {
            return { exists: false };
        }
    }

    @Post('register')
    async register(
        @Body('name') name,
        @Body('password') password,
        @Body('email') email,
        @Body('phone') phone,
        @Body('document') document,
        @Body('birthAt') birthAt,
    ) {

        if(birthAt) {
            try {

               birthAt = parse(birthAt, 'yyyy-MM-dd', new Date());

            } catch(e) {
               throw new BadRequestException("Invalid date");
            }
         }

        const user = await this.userService.create({
            name,
            email,
            password,
            phone,
            document,
            birthAt,
        });

        const token = await this.authService.getToken(user.id)

        return { user, token };
    }


    @Post('login')
    async login(@Body('email') email, @Body('password') password) {
        return this.authService.login({email, password});
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Auth() auth, @User() user) {
        return { auth, user  }
    }

    @UseGuards(AuthGuard)
    @Put('profile')
    async updateProfile(@Body() body, @Auth('id') id: number) {

        if(body.birthAt) {
            body.birthAt = dateStringToDate(body.birthAt);
        }

        return this.userService.update(id, body);
    }

    @UseGuards(AuthGuard)
    @Put('password')
    async changePassword(
        @Body('currentPassword') currentPassword,
        @Body('newPassword') newPassword,
        @User('id') id,
    ) {
        return this.userService.changePassword(id, currentPassword, newPassword);
    }

    @Post('forget')
    async forget(@Body('email') email: string) {
        return await this.authService.recovery(email)
    }

    @Post('password-reset')
    async resetPassword(@Body('password') password: string, @Body('token') token: string) {
        return await this.authService.reset({password, token});
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            dest: './storage/photos',
            limits: {
                fileSize: 50 * 1024 * 1024,
                files: 1,
            },
        }),
    )
    @Put('photo')
    async uploadFile(@UploadedFile() file: Express.Multer.File, @User() user){
        return this.userService.setPhoto(user.id, file)
    }

    @UseGuards(AuthGuard)
    @Get('photo')
    getUserPhoto(
        @Response({ passthrough: true }) res,
        @User('photo') photo: string,
    ) {
        return this.photoService.getStreambleFile(photo, res);
    }

    @Post('reset-token')
    async resetToken(@Body('token') token) {
        return {
            valid: await this.authService.checkResetToken({ token }),
        };
    }
}
