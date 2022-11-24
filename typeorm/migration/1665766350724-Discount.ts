import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Discount1665766350724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: "discount",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "discountPorcent",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("discount");
    }

}
