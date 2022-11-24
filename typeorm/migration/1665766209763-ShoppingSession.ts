import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ShoppingSession1665766209763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "shoppingSession",
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

        await queryRunner.createForeignKey("shoppingSession", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "person",
            name: "FK_shoppingSession_Person",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("shoppingSession", "FK_shoppingSession_Person");
        await queryRunner.dropTable("shoppingSession");
    }

}
