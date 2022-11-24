import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Product1665766306496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product",
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
                    name: "image",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "price",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                },
                {
                    name: "quantity",
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

        // await queryRunner.createForeignKey("product", new TableForeignKey({
        //     columnNames: ["categoryId"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "productCategory",
        //     name: "FK_product_Category",
        //     onDelete: "CASCADE"
        // }))


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product");
    }

}
