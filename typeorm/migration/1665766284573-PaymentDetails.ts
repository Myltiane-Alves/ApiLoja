// import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

// export class PaymentDetails1665766284573 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: "paymentDetails",
//             columns: [
//                 {
//                     name: "id",
//                     type: "int",
//                     isPrimary: true,
//                     isGenerated: true,
//                     generationStrategy: "increment"
//                 },
//                 {
//                     name: "oderId",
//                     type: "int",
//                     isNullable: false
//                 },
//                 {
//                     name: "paymentTypeId",
//                     type: "int",
//                     isNullable: false
//                 },{
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
//         }));

//         await queryRunner.createForeignKey("paymentDetails", new TableForeignKey({
//             columnNames: ["oderId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "orderDetails",
//             name: "FK_paymentDetails_OrderDetails",
//             onDelete: "CASCADE"
//         }))

//         await queryRunner.createForeignKey("paymentDetails", new TableForeignKey({
//             columnNames: ["paymentTypeId"],
//             referencedColumnNames: ["id"],
//             referencedTableName: "paymentType",
//             name: "FK_paymentDetails_PaymentType",
//             onDelete: "CASCADE"
//         }))

//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropForeignKey("paymentDetails", "FK_paymentDetails_PaymentType");
//         await queryRunner.dropForeignKey("paymentDetails", "FK_paymentDetails_OrderDetails");
//         await queryRunner.dropTable("paymentDetails");
//     }

// }
