import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddOrganization1620815501676 implements MigrationInterface {
  name = `AddOrganization1620815501676`

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization"."organization" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),"iName" character varying(100),"desc" character varying NOT NULL,"phone" integer NOT NULL,"location" character varying NOT Null, CONSTRAINT "PK_ed1251fa3856cd1a6c98d7bcaa3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_84931e71beb141b1e131f80daa" ON "organization"."organization" ("name") `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "organization"."IDX_84931e71beb141b1e131f80daa"`
    )
    await queryRunner.query(`DROP TABLE "organization"."organization"`)
  }
}
