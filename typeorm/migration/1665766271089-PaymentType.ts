import { type } from "os";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PaymentType1665766271089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "paymentType",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "namePayment",
                    type: "varchar",
                    length: "100",
                    isNullable: false
                },
                {
                    name: "paymentTypecol",
                    type: "varchar",
                    length: "100",
                    isNullable: false
                }
            ]
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("paymentType");
    }


}
