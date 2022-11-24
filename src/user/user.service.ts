import {
    Injectable,
    BadRequestException,
    NotFoundException,
    UnauthorizedException

} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { join } from 'path';
import { createReadStream, existsSync, renameSync, unlinkSync } from 'fs';
import { throws } from 'assert';


@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,

    ) { }

    async get(id: number, hashPassword = false) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('Id is required');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                person: true
            }
        })

        if (!hashPassword) {
            delete user.password;
        }

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return user;
    }

    async getByEmail(email: string) {
        if (!email) {
            throw new BadRequestException('Email is required')
        }

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                person: true
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async create({
            name,
            email,
            birthAt,
            password,
            phone,
            document

        }: {
            name: string;
            email: string;
            password: string;
            birthAt?: Date;
            phone?: string;
            document?: string;
        }) {

            if (!name) {
                throw new BadRequestException("Name is required");
             }

             if (!email) {
                throw new BadRequestException("E-mail is required");
             }

             if (!password) {
                throw new BadRequestException("Password is required");
             }

             if (birthAt && birthAt.toString().toLowerCase() === 'invalid date') {
                throw new BadRequestException("Birth date is invalid");
             }

        let user = null

        try {
            user = await this.getByEmail(email);
        } catch (e) {

        }

        if (user) {
            throw new BadRequestException('Email already exists');
        }

        const userCreated = await this.prisma.user.create({
            data: {
                person: {
                    create:  {
                        name,
                        birthAt,
                        phone,
                        document,
                    },
                },
                email,
                password: await bcrypt.hash(password, 10),
            },
            include: {
                person: true
            }
        })

        return userCreated;
    }

    async update(id: number, {
        name,
        email,
        birthAt,
        phone,
        document,
    }: UpdateUserDto
    ) {

        id = Number(id);

        if(isNaN(id)) {
            throw new BadRequestException('Id is not a number');
        }

        const dataPerson = {} as Prisma.personUpdateInput;
        const dataUser = {} as Prisma.userUpdateInput;

        if (name) {
            dataPerson.name = name;
        }

        if (birthAt) {
            dataPerson.birthAt = birthAt;
        }

        if (phone) {
            dataPerson.phone = phone;
        }

        if (document) {
            dataPerson.document = document;
        }



        if (email) {
            dataUser.email = email;
        }

        const user = await this.get(id)

        if (dataPerson) {
            await this.prisma.person.update({
                where: {
                    id: user.personId,
                },
                data: dataPerson,
            });
        }

        if (dataUser) {
            await this.prisma.user.update({
                where: {
                    id,
                },
                data: dataUser,
            });
        }

        return this.get(id);
    }

    async checkPassword(id: number, password: string) {
        const user = await this.get(id, true);

        const checked = await bcrypt.compare(password, user.password);

        if (!checked) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        return true;
    }

    async updatePassword(id: number, password: string) {

        const user = await this.get(id)

        const userUpdated = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password: bcrypt.hashSync(password, 10),
            },
            include: {
                person: true
            }
        });

        delete userUpdated.password;

        // await this.mailService.send({
        //     to: userUpdated.email,
        //     subject: "Sua senha foi alterada com sucesso!",
        //     template: "reset-password-confirm",
        //     data: {
        //        name: userUpdated.person.name,
        //     }
        // })

        return userUpdated;
    }

    async changePassword(id: number, currentPassword: string, newPassword: string) {

        if(!newPassword) {
            throw new BadRequestException('New password is required');
        }

        await this.checkPassword(id, currentPassword);

        return this.updatePassword(id, newPassword);
    }

    async delete(id: number) {
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('Id is required');
        }

        const user = await this.prisma.user.delete({
            where: {
                id,
            }
        })

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return { message: 'User deleted successfully', user };
    }

    getStoragePhotoPath(photo: string){

        if(!photo) {
            throw new BadRequestException("Photo is required")
        }

        return join(__dirname, '../', '../', '../', 'storage', 'photos', photo);
    }

    async removePhoto(userId: number){
        const { id, photo } = await this.get(userId);

        if(photo) {

            const currentPhoto = this.getStoragePhotoPath(photo);

            if(existsSync(currentPhoto)) {
                unlinkSync(currentPhoto);
            }
        }

        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                photo: null,
            }
        });
    }

    async setPhoto(id: number, file: Express.Multer.File) {
        if(!file) {
            throw new BadRequestException("File is required.");
        }

        if(!['iamge/png', 'image/jpeg'].includes(file.mimetype)) {
            throw new BadRequestException("Invalid file type.");
        }

        await this.removePhoto(id);

        let ext = '';

        switch (file.mimetype) {
            case 'image/png':
                ext = 'png';
                break;
            default:
                ext = 'jpg';
        }

        const photo = `${file.filename}.${ext}`;
        const from = this.getStoragePhotoPath(file.filename)
        const to =  this.getStoragePhotoPath(photo)

        renameSync(from, to);

        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                photo,
            },
        });

    }

    async getPhoto(id: number){
        const { photo } = await this.get(id);

        let filePath = this.getStoragePhotoPath('../nophoto.png');

        if(photo) {
            filePath = this.getStoragePhotoPath(photo);
        }

        const file = createReadStream(filePath)

        const extension = filePath.split('.').pop();

        return {
            file,
            extension
        };
    }
}
