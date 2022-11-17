// import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

// export class CartItem1665766172313 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: "cartItem",
//             columns: [
//                 {
//                     name: "id",
//                     type: "int",
//                     isPrimary: true,
//                     isGenerated: true,
//                     generationStrategy: "increment"
//                 },
//                 {
//                     name: "sessionId",
//                     type: "int",
//                     isNullable: false
//                 },
//                 {
//                     name: "productId",
//                     type: "int",
//                     isNullable: false
//                 },
//                 {
//                     name: "quantity",
//                     type: "int",
//                     isNullable: false
//                 },
//                 {
//                     name: "createdAt",
//                     type: "timestamp",
//                     default: "CURRENT_TIMESTAMP"
//                 },
//                 {
//                     name: "updatedAt",
//                     type: "timestamp",
//                     default: "CURRENT_TIMESTAMP"
//                 }
//             ]
//         }))

//        await queryRunner.createForeignKey("cartItem", new TableForeignKey({
//             columnNames: ["sessionId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "shoppingSession",
//             name: "FK_cartItem_ShoppingSession",
//             onDelete: "CASCADE"
//        }))

//         await queryRunner.createForeignKey("cartItem", new TableForeignKey({
//             columnNames: ["productId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "product",
//             name: "FK_cartItem_Product",
//             onDelete: "CASCADE"
//         }))

//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropForeignKey("cartItem", "FK_cartItem_ShoppingSession");
//         await queryRunner.dropForeignKey("cartItem", "FK_cartItem_Product");
//         await queryRunner.dropTable("cartItem");
//     }

// }
