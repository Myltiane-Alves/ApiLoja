import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UserPayment1665766245537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "userPayment",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"

                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "paymentTypeId",
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

        await queryRunner.createForeignKey("userPayment", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            name: "FK_userPayment_User",
            onDelete: "CASCADE"
        }))

        await queryRunner.createForeignKey("userPayment", new TableForeignKey({
            columnNames: ["paymentTypeId"],
            referencedColumnNames: ["id"],
            referencedTableName: "paymentType",
            name: "FK_userPayment_PaymentType",
            onDelete: "CASCADE"
        }))

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("userPayment", "FK_userPayment_User");
        await queryRunner.dropTable("userPayment");
    }

}
