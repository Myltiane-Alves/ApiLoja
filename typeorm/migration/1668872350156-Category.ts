// import { MigrationInterface, QueryRunner, Table } from "typeorm"

// export class Category1668872350156 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: "categories",
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
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropTable("categories")
//     }

// }
