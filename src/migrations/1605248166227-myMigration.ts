import { MigrationInterface, QueryRunner } from "typeorm";

export class myMigration1605248166227 implements MigrationInterface {
  name = "myMigration1605248166227";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "characters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "realName" character varying(100) NOT NULL, "superName" character varying(100) NOT NULL, "genderId" integer NOT NULL, "typesId" integer NOT NULL, CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "films" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "releasedYear" integer NOT NULL, CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "appear" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "characterId" uuid, "filmId" uuid, CONSTRAINT "PK_22677e859588ae864d423d55dc4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "gender" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "appear" ADD CONSTRAINT "FK_1cfc58f95dc7986e78d4cf606af" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appear" ADD CONSTRAINT "FK_bccea2dff7ff6df41681d4cd9c2" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appear" DROP CONSTRAINT "FK_bccea2dff7ff6df41681d4cd9c2"`
    );
    await queryRunner.query(
      `ALTER TABLE "appear" DROP CONSTRAINT "FK_1cfc58f95dc7986e78d4cf606af"`
    );
    await queryRunner.query(`DROP TABLE "types"`);
    await queryRunner.query(`DROP TABLE "gender"`);
    await queryRunner.query(`DROP TABLE "appear"`);
    await queryRunner.query(`DROP TABLE "films"`);
    await queryRunner.query(`DROP TABLE "characters"`);
  }
}
