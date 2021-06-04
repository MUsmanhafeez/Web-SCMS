import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserOrgRelationship1620815594463 implements MigrationInterface {
  name = `AddUserOrgRelationship1620815594463`

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization"."organizationMembers" ("userId" uuid NOT NULL, "orgId" uuid NOT NULL, CONSTRAINT "PK_2a475962c6ced597b032a4416d5" PRIMARY KEY ("userId", "orgId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_480f92a0b3aaf8f047d30569d3" ON "organization"."organizationMembers" ("userId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_385a509b0b2040bb7a7391e1f6" ON "organization"."organizationMembers" ("orgId") `
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD CONSTRAINT "FK_480f92a0b3aaf8f047d30569d33" FOREIGN KEY ("userId") REFERENCES "userIdm"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD CONSTRAINT "FK_385a509b0b2040bb7a7391e1f66" FOREIGN KEY ("orgId") REFERENCES "organization"."organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP CONSTRAINT "FK_385a509b0b2040bb7a7391e1f66"`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP CONSTRAINT "FK_480f92a0b3aaf8f047d30569d33"`
    )
    await queryRunner.query(
      `DROP INDEX "organization"."IDX_385a509b0b2040bb7a7391e1f6"`
    )
    await queryRunner.query(
      `DROP INDEX "organization"."IDX_480f92a0b3aaf8f047d30569d3"`
    )
    await queryRunner.query(`DROP TABLE "organization"."organizationMembers"`)
  }
}
