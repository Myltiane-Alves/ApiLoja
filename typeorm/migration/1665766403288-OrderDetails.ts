import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class OrderDetails1665766403288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orderDetails",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "personId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "total",
                    type: "decimal",
                    precision: 10,
                    scale: 2,

                },
                {
                    name: "paymentId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
            ]
        }))

        await queryRunner.createForeignKey("orderDetails", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "person",
            name: "FK_orderDetails_Person",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("orderDetails", "FK_orderDetails_Person");
        await queryRunner.dropTable("orderDetails");
    }

}
