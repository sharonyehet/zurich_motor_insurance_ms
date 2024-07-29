import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722266541475 implements MigrationInterface {
    name = 'Migration1722266541475';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "PRODUCT" ("id" SERIAL NOT NULL, "productCode" character varying NOT NULL, "productDescription" character varying(128), "location" character varying(128) NOT NULL, "price" numeric(15,2) NOT NULL, CONSTRAINT "UQ_ec7b772773192c6c293cc8fb1fd" UNIQUE ("productCode"), CONSTRAINT "PK_7ed694dc1913db32f3eded6080f" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PRODUCT"`);
    }
}
