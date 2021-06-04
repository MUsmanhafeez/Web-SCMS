import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUser1620815415598 implements MigrationInterface {
  name = `AddUser1620815415598`

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "userIdm"."user_status_enum" AS ENUM('UNVERIFIED', 'ACTIVE', 'INACTIVE', 'TERMINATED')`
    )
    await queryRunner.query(
      `CREATE TABLE "userIdm"."user" ("id" uuid NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "status" "userIdm"."user_status_enum" NOT NULL DEFAULT 'UNVERIFIED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38f9ac7972d56576daab1199742" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_2b7d47a04bcb3d3d96b3d6464d" ON "userIdm"."user" ("email") `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "userIdm"."IDX_2b7d47a04bcb3d3d96b3d6464d"`
    )
    await queryRunner.query(`DROP TABLE "userIdm"."user"`)
    await queryRunner.query(`DROP TYPE "userIdm"."user_status_enum"`)
  }
}
