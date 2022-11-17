import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Person1668708063467 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "person",
            columns: [ {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            },
            {
                name: "name",
                type: "varchar",
                length: "250",
                isNullable: false
            },
            {
                name: "birthAt",
                type: "date",
                isNullable: false,
            },
            {
                name: "phone",
                type: "varchar",
                length: "20",
                isNullable: false,
            },
            {
                name: "document",
                type: "varchar",
                length: "14",
                isNullable: false,
            },
            {
                name: "createdAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            },
            {
                name: "updatedAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            }

            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("person");
    }

}
