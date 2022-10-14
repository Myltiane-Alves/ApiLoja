import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class address1665761159450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "address",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "addressLine1",
                    type: "varchar",
                    length: "255"
                },
                {
                    name: "addressLine2",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "city",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "zipCode",
                    type: "varchar",
                    length: "10",
                    isNullable: false,
                },
                {
                    name: "country",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "36",
                    isNullable: false,
                },
                {
                    name: "phoneMobile",
                    type: "varchar",
                    length: "36",
                    isNullable: false,
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: "updatedAt",
                    type: "datetime",
                    default: 'CURRENT_TIMESTAMP',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address")
    }

}
