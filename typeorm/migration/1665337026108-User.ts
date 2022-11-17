import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class User1665337026108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "photo",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: 'personId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                }

            ]
        }))

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "person",
            name: "FK_users_persons",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user", "FK_users_persons");
        await queryRunner.dropTable("user")
    }

}
