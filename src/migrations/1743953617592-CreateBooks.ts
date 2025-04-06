import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBooks1743953617592 implements MigrationInterface {
    name = 'CreateBooks1743953617592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "year" integer NOT NULL, "category" character varying NOT NULL, "language" character varying NOT NULL, "description" character varying NOT NULL, "cover_image" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'available', "average_rating" double precision NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
