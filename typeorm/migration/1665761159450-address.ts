import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Address1665761159450 implements MigrationInterface {

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
                    name: "personId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "street",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "number",
                    type: "varchar",
                    length: "16",
                },
                {
                    name: "complement",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "district",
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
                    name: "state",
                    type: "varchar",
                    length: "255",
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

        await queryRunner.createForeignKey("address", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "person",
            name: "FK_address_person",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("address", "FK_address_person")
        await queryRunner.dropTable("address")
    }

}
