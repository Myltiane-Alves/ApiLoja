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
            name: "FK_users_Person",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user", "FK_users_Person");
        await queryRunner.dropTable("user")
    }

}
//




// //   model Discount {
// //     id              Int      @id @default(autoincrement())
// //     name            String   @db.VarChar(255)
// //     description     String   @db.VarChar(255)
// //     discountPorcent Decimal  @db.Decimal(10, 2)
// //     createdAt       DateTime @default(now()) @db.Timestamp(0)
// //     updatedAt       DateTime @default(now()) @db.Timestamp(0)

// //     @@map("discount")
// //   }

// //   model PaymentType {
// //     id             Int              @id @default(autoincrement())
// //     namePayment    String           @db.VarChar(100)
// //     paymentTypecol String           @db.VarChar(100)
// //     paymentdetails PaymentDetail[] @relation("paymentdetailsTopaymenttype")
// //     userpayment    UserPayment[]    @relation("paymenttypeTouserpayment")

// //     @@map("paymenttype")
// //   }

// //   model Person {
// //     id              Int               @id @default(autoincrement())
// //     name            String            @db.VarChar(250)
// //     birthAt         DateTime          @db.Date
// //     phone           String            @db.VarChar(20)
// //     document        String            @db.VarChar(14)
// //     createdAt       DateTime          @default(now()) @db.DateTime(0)
// //     updatedAt       DateTime          @default(now()) @db.DateTime(0)
// //     address         Address[]         @relation("addressToperson")
// //     contacts        Contact[]         @relation("contactsToperson")
// //     orderdetails    OrderDetail[]    @relation("orderdetailsToperson")
// //     shoppingsession ShoppingSession[] @relation("personToshoppingsession")
// //     user            User[]            @relation("personTouser")
// //     userpayment     UserPayment[]     @relation("personTouserpayment")

// //     @@map("person")
// //   }

// //   model Product {
// //     id          Int          @id @default(autoincrement())
// //     name        String       @db.VarChar(255)
// //     description String       @db.VarChar(255)
// //     image       String?      @db.VarChar(255)
// //     price       Decimal      @db.Decimal(10, 2)
// //     quantity    String       @db.VarChar(255)
// //     createdAt   DateTime     @default(now()) @db.Timestamp(0)
// //     updatedAt   DateTime     @default(now()) @db.Timestamp(0)
// //     cartitem    CartItem[]   @relation("cartitemToproduct")
// //     orderitems  OrderItem[] @relation("orderitemsToproduct")

// //     @@map("product")
// //   }

// //   model ProductCategory {
// //     id          Int      @id @default(autoincrement())
// //     name        String   @db.VarChar(255)
// //     description String   @db.VarChar(255)
// //     createdAt   DateTime @default(now()) @db.Timestamp(0)
// //     updatedAt   DateTime @default(now()) @db.Timestamp(0)

// //     @@map("productcategory")
// //   }

// //   model User {
// //     id               Int                @id @default(autoincrement())
// //     email            String             @unique(map: "UQ_e12875dfb3b1d92d7d7c5377e22") @db.VarChar(255)
// //     password         String             @db.VarChar(255)
// //     photo            String?            @db.VarChar(255)
// //     personId         Int
// //     createdAt        DateTime           @default(now()) @db.DateTime(0)
// //     updatedAt        DateTime           @default(now()) @db.DateTime(0)
// //     person           Person             @relation("personTouser", fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_users_Person")
// //     passwordrecovery PasswordRecovery[] @relation("passwordrecoveryTouser")

// //     @@index([personId], map: "FK_users_Person")
// //     @@map("user")
// //   }

// //   model Contact {
// //     id        Int      @id @default(autoincrement())
// //     personId  Int
// //     name      String   @db.VarChar(255)
// //     email     String   @db.VarChar(255)
// //     phone     String   @db.VarChar(255)
// //     createdAt DateTime @default(now()) @db.Timestamp(0)
// //     updatedAt DateTime @default(now()) @db.Timestamp(0)
// //     person    Person   @relation("contactsToperson", fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_contacts_Person")

// //     @@index([personId], map: "FK_contacts_Person")
// //     @@map("contacts")
// //   }

// //   model CartItem {
// //     id              Int             @id @default(autoincrement())
// //     sessionId       Int
// //     productId       Int
// //     quantity        Int
// //     createdAt       DateTime        @default(now()) @db.Timestamp(0)
// //     updatedAt       DateTime        @default(now()) @db.Timestamp(0)
// //     product         Product         @relation("cartitemToproduct", fields: [productId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_cartItem_Product")
// //     shoppingsession ShoppingSession @relation(fields: [sessionId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_cartItem_ShoppingSession")

// //     @@index([productId], map: "FK_cartItem_Product")
// //     @@index([sessionId], map: "FK_cartItem_ShoppingSession")
// //     @@map("cartItems")
// //   }

// //   model OrderDetail {
// //     id             Int              @id @default(autoincrement())
// //     personId       Int
// //     total          Decimal          @db.Decimal(12, 4)
// //     paymentId      Int
// //     createdAt      DateTime         @default(now()) @db.Timestamp(0)
// //     updatedAt      DateTime         @default(now()) @db.Timestamp(0)
// //     person         Person           @relation("orderdetailsToperson", fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_orderDetails_Person")
// //     orderitems     OrderItem[]
// //     paymentdetails PaymentDetail[]

// //     @@index([personId], map: "FK_orderDetails_Person")
// //     @@map("orderDetails")
// //   }

// //   model OrderItem {
// //     id           Int          @id @default(autoincrement())
// //     orderId      Int
// //     productId    Int
// //     quantity     Int
// //     createdAt    DateTime     @default(now()) @db.Timestamp(0)
// //     updatedAt    DateTime     @default(now()) @db.Timestamp(0)
// //     orderdetails OrderDetail @relation(fields: [orderId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_orderItems_OrderDetails")
// //     product      Product      @relation("orderitemsToproduct", fields: [productId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_orderItems_Product")

// //     @@index([orderId], map: "FK_orderItems_OrderDetails")
// //     @@index([productId], map: "FK_orderItems_Product")
// //     @@map("orderItems")
// //   }

// //   model PasswordRecovery {
// //     id        Int       @id @default(autoincrement())
// //     token     String    @db.VarChar(255)
// //     userId    Int
// //     resetAt   DateTime? @db.DateTime(0)
// //     createdAt DateTime  @default(now()) @db.DateTime(0)
// //     updatedAt DateTime  @default(now()) @db.DateTime(0)
// //     user      User      @relation("passwordrecoveryTouser", fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_password_recoveries_users")

// //     @@index([userId], map: "FK_password_recoveries_users")
// //     @@map("passwordRecovery")
// //   }

// //   model PaymentDetail {
// //     id            Int          @id @default(autoincrement())
// //     oderId        Int
// //     paymentTypeId Int
// //     createdAt     DateTime     @default(now()) @db.Timestamp(0)
// //     updatedAt     DateTime     @default(now()) @db.Timestamp(0)
// //     orderdetails  OrderDetail @relation(fields: [oderId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_paymentDetails_OrderDetails")
// //     paymenttype   PaymentType  @relation("paymentdetailsTopaymenttype", fields: [paymentTypeId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_paymentDetails_PaymentType")

// //     @@index([oderId], map: "FK_paymentDetails_OrderDetails")
// //     @@index([paymentTypeId], map: "FK_paymentDetails_PaymentType")
// //     @@map("paymentDetails")
// //   }

// //   model ShoppingSession {
// //     id        Int        @id @default(autoincrement())
// //     personId  Int
// //     total     Decimal    @default(0.00) @db.Decimal(10, 2)
// //     createdAt DateTime   @default(now()) @db.Timestamp(0)
// //     updatedAt DateTime   @default(now()) @db.Timestamp(0)
// //     person    Person     @relation("personToshoppingsession", fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_shoppingSession_Person")
// //     cartitem  CartItem[]

// //     @@index([personId], map: "FK_shoppingSession_Person")
// //     @@map("shoppingSession")
// //   }

// //   model UserPayment {
// //     id            Int         @id @default(autoincrement())
// //     personId      Int
// //     paymentTypeId Int
// //     createdAt     DateTime    @default(now()) @db.Timestamp(0)
// //     updatedAt     DateTime    @default(now()) @db.Timestamp(0)
// //     paymenttype   PaymentType @relation("paymenttypeTouserpayment", fields: [paymentTypeId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_userPayment_PaymentType")
// //     person        Person      @relation("personTouserpayment", fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_userPayment_Person")

// //     @@index([paymentTypeId], map: "FK_userPayment_PaymentType")
// //     @@index([personId], map: "FK_userPayment_Person")
// //     @@map("userPayment")
// //   }

// //   model Address {
// //     id          Int      @id @default(autoincrement())
// //     personId    Int
// //     street      String   @db.VarChar(255)
// //     number      String   @db.VarChar(16)
// //     complement  String   @db.VarChar(255)
// //     district    String   @db.VarChar(255)
// //     city        String   @db.VarChar(255)
// //     zipCode     String   @db.VarChar(10)
// //     state       String   @db.VarChar(255)
// //     country     String   @db.VarChar(100)
// //     phone       String   @db.VarChar(36)
// //     phoneMobile String   @db.VarChar(36)
// //     createdAt   DateTime @default(now()) @db.DateTime(0)
// //     updatedAt   DateTime @default(now()) @db.DateTime(0)
// //     person      Person   @relation("addressToperson", fields: [personId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "FK_address_person")

// //     @@index([personId], map: "FK_address_person")
// //     @@map("addresses")
// //   }
