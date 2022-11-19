import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class User1665337026108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "photo",
                    type: "varchar",
                    length: "255",
                    isNullable: true,
                },
                {
                    name: 'personId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                }

            ]
        }))

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "person",
            name: "FK_users_persons",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user", "FK_users_persons");
        await queryRunner.dropTable("user")
    }

}



// model Address {
//     id          Int      @id @default(autoincrement())
//     personId    Int
//     street      Int
//     number      String   @db.VarChar(16)
//     complement  String   @db.VarChar(255)
//     district    String   @db.VarChar(255)
//     city        String   @db.VarChar(255)
//     zipCode     String   @db.VarChar(10)
//     state       String   @db.VarChar(255)
//     country     String   @db.VarChar(100)
//     phone       String   @db.VarChar(36)
//     phoneMobile String   @db.VarChar(36)
//     createdAt   DateTime @default(now()) @db.DateTime(0)
//     updatedAt   DateTime @default(now()) @db.DateTime(0)
//     person      Person   @relation(fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_address_person")

//     @@index([personId], map: "FK_address_person")
//   }

//   model Discount {
//     id              Int      @id @default(autoincrement())
//     name            String   @db.VarChar(255)
//     description     String   @db.VarChar(255)
//     discountPorcent Decimal  @db.Decimal(10, 2)
//     createdAt       DateTime @default(now()) @db.Timestamp(0)
//     updatedAt       DateTime @default(now()) @db.Timestamp(0)
//   }

//   model PasswordRecovery {
//     id        Int       @id @default(autoincrement())
//     token     String    @db.VarChar(255)
//     userId    Int
//     resetAt   DateTime? @db.DateTime(0)
//     createdAt DateTime  @default(now()) @db.DateTime(0)
//     updatedAt DateTime  @default(now()) @db.DateTime(0)
//     user      User      @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_password_recoveries_users")

//     @@index([userId], map: "FK_password_recoveries_users")
//   }

//   model PaymentType {
//     id             Int    @id @default(autoincrement())
//     namePayment    String @db.VarChar(100)
//     paymentTypecol String @db.VarChar(100)
//   }

//   model Person {
//     id        Int       @id @default(autoincrement())
//     name      String    @db.VarChar(250)
//     birthAt   DateTime  @db.Date
//     phone     String    @db.VarChar(20)
//     document  String    @db.VarChar(14)
//     createdAt DateTime  @default(now()) @db.DateTime(0)
//     updatedAt DateTime  @default(now()) @db.DateTime(0)
//     address   Address[]
//     user      User[]
//   }

//   model Product {
//     id          Int      @id @default(autoincrement())
//     name        String   @db.VarChar(255)
//     description String   @db.VarChar(255)
//     image       String?  @db.VarChar(255)
//     price       Decimal  @db.Decimal(10, 2)
//     quantity    String   @db.VarChar(255)
//     createdAt   DateTime @default(now()) @db.Timestamp(0)
//     updatedAt   DateTime @default(now()) @db.Timestamp(0)
//   }

//   model ProductCategory {
//     id          Int      @id @default(autoincrement())
//     name        String   @db.VarChar(255)
//     description String   @db.VarChar(255)
//     createdAt   DateTime @default(now()) @db.Timestamp(0)
//     updatedAt   DateTime @default(now()) @db.Timestamp(0)
//   }

//   model User {
//     id               Int                @id @default(autoincrement())
//     email            String             @unique(map: "UQ_e12875dfb3b1d92d7d7c5377e22") @db.VarChar(255)
//     password         String             @db.VarChar(255)
//     photo            String?            @db.VarChar(255)
//     personId         Int
//     createdAt        DateTime           @default(now()) @db.DateTime(0)
//     updatedAt        DateTime           @default(now()) @db.DateTime(0)
//     person           Person             @relation(fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_users_persons")
//     PasswordRecovery PasswordRecovery[]

//     @@index([personId], map: "FK_users_persons")
//   }
