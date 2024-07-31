import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722348789222 implements MigrationInterface {
    name = 'Migration1722348789222';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" DROP CONSTRAINT "UQ_ec7b772773192c6c293cc8fb1fd"`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" DROP COLUMN "productCode"`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" ADD "productCode" character varying(4) NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" DROP COLUMN "productCode"`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" ADD "productCode" character varying NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" ADD CONSTRAINT "UQ_ec7b772773192c6c293cc8fb1fd" UNIQUE ("productCode")`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" DROP COLUMN "deletedAt"`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" DROP COLUMN "isDeleted"`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" DROP COLUMN "updatedAt"`,
        );
        await queryRunner.query(
            `ALTER TABLE "PRODUCT" DROP COLUMN "createdAt"`,
        );
    }
}
