// import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

// export class Product1665766306496 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: "product",
//             columns: [
//                 {
//                     name: "id",
//                     type: "int",
//                     isPrimary: true,
//                     isGenerated: true,
//                     generationStrategy: "increment"
//                 },
//                 {
//                     name: "name",
//                     type: "varchar",
//                     length: "255",
//                     isNullable: false
//                 },
//                 {
//                     name: "description",
//                     type: "varchar",
//                     length: "255",
//                     isNullable: false
//                 },
//                 {
//                     name: "barCode",
//                     type: "varchar",
//                     length: "255",
//                     isNullable: false
//                 },
//                 {
//                     name: "price",
//                     type: "decimal",
//                     precision: 10,
//                     scale: 2,
//                 },
//                 {
//                     name: "categoryId",
//                     type: "int",
//                     isNullable: false
//                 },
//                 {
//                     name: "inventoryId",
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
        
//         await queryRunner.createForeignKey("product", new TableForeignKey({
//             columnNames: ["categoryId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "productCategory",
//             name: "FK_product_Category",
//             onDelete: "CASCADE"
//         }))

//         await queryRunner.createForeignKey("product", new TableForeignKey({
//             columnNames: ["inventoryId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "productInventory",
//             name: "FK_product_Inventory",
//             onDelete: "CASCADE"
//         }))

//         await queryRunner.createForeignKey("product", new TableForeignKey({
//             columnNames: ["discountId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "discount",
//             name: "FK_product_Discount",
//             onDelete: "CASCADE"
//         }))
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropForeignKey("product", "FK_product_Category");
//         await queryRunner.dropForeignKey("product", "FK_product_Inventory");
//         await queryRunner.dropForeignKey("product", "FK_product_Discount");
//         await queryRunner.dropTable("product");
//     }

// }
