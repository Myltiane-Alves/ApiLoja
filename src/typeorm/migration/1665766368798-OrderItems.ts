import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class OrderItems1665766368798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orderItems",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "orderId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "productId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "quantity",
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
                }
            ]
        }))

        await queryRunner.createForeignKey("orderItems", new TableForeignKey({
            columnNames: ["orderId"],
            referencedColumnNames: ["id"],
            referencedTableName: "orderDetails",
            name: "FK_orderItems_OrderDetails",
            onDelete: "CASCADE"
        }))

        await queryRunner.createForeignKey("orderItems", new TableForeignKey({
            columnNames: ["productId"],
            referencedColumnNames: ["id"],
            referencedTableName: "product",
            name: "FK_orderItems_Product",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("orderItems", "FK_orderItems_OrderDetails");
        await queryRunner.dropForeignKey("orderItems", "FK_orderItems_Product");
        await queryRunner.dropTable("orderItems");
    }

}
