import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class PasswordRecovery1668782105048 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "passwordRecovery",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            },
            {
                name: "token",
                type: "varchar",
            },
            {
                name: "userId",
                type: "int",
            },
            {
                name: "resetAt",
                type: "datetime",
                isNullable: true,
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

        await queryRunner.createForeignKey("passwordRecovery", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            name: "FK_password_recoveries_users",
            onDelete: "CASCADE"
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("passwordRecovery", "FK_password_recoveries_users");
        await queryRunner.dropTable("passwordRecovery");
    }

}
