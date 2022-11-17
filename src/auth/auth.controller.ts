import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { Auth } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
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
        @Body('userName') userName,
        @Body('password') password,
        @Body('email') email,
        @Body('name') name,
        @Body('phone') phone,
    ) {
        const user = await this.userService.create({
            userName,
            password,
            email,
            name,
            phone,
        });

        const token = await this.authService.getToken(user.id)

        return { user, token };
    }


    @Post('login')
    async login(@Body('email') email, @Body('password') password) {
        return await this.authService.login(email, password);
    }

    @Get('me')
    async me(@Auth() auth, @User() user) {
        return { auth, user  }
    }


    @Post('forget')
    async forgetPassword(@Body('email') email: string) {
        return await this.authService.forgetPassword(email)
    }
}
