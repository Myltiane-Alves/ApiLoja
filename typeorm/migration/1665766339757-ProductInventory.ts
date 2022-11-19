// import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

// export class ProductInventory1665766339757 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: "productInventory",
//             columns: [
//                 {
//                     name: "id",
//                     type: "int",
//                     isPrimary: true,
//                     isGenerated: true,
//                     generationStrategy: "increment"
//                 },
//                 {
//                     name: "quantity",
//                     type: "int",
//                     isNullable: false
//                 },
//                 {
//                     name: "categoryId",
//                     type: "int",
//                     isNullable: false
//                 },
//                 {
//                     name: "discountId",
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

//         await queryRunner.createForeignKey("productInventory", new TableForeignKey({
//             columnNames: ["categoryId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "productCategory",
//             name: "FK_productInventory_category",
//             onDelete: "CASCADE"
//         }))

//         await queryRunner.createForeignKey("productInventory", new TableForeignKey({
//             columnNames: ["discountId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "discount",
//             name: "FK_productInventory_discount",
//             onDelete: "CASCADE"
//         }))


//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropForeignKey("productInventory", "FK_productInventory_category");
//         await queryRunner.dropForeignKey("productInventory", "FK_productInventory_discount");
//         await queryRunner.dropTable("productInventory");
//     }

// }
