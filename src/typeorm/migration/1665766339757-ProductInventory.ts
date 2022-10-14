import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ProductInventory1665766339757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "productInventory",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "quantity",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "inventoryId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "categoryId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "discountId",
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

       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("productInventory");
    }

}
