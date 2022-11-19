// import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

// export class Products1668870157991 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: "products",
//             columns: [{
//                 name: "id",
//                 type: "int",
//                 isPrimary: true,
//                 isGenerated: true,
//                 generationStrategy: "increment",
//             },
//             {
//                 name: "productId",
//                 type: "int",
//                 isNullable: false,
//             },
//             {
//                 name: "categoryId",
//                 type: "int",
//                 isNullable: false
//             },
//             {
//                 name: "inventoryId",
//                 type: "int",
//                 isNullable: false
//             },
//             {
//                 name: "discountId",
//                 type: "int",
//                 isNullable: false
//             },
//             {
//                 name: "createdAt",
//                 type: "datetime",
//                 default: "CURRENT_TIMESTAMP",
//             },
//             {
//                 name: "updatedAt",
//                 type: "datetime",
//                 default: "CURRENT_TIMESTAMP",
//              }
//             ]
//         }))

//         await queryRunner.createForeignKey("products", new TableForeignKey({
//             columnNames: ["productId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "product",
//             name: "FK_products_product",
//             onDelete: "CASCADE"
//         }))

//     }


//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropForeignKey("products", "FK_products_product");
//         await queryRunner.dropTable("products");
//     }

// }
