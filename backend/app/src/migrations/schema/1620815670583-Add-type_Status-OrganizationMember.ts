import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTypeStatusOrganizationMember1620815670583
  implements MigrationInterface {
  name = `AddTypeStatusOrganizationMember1620815670583`

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP CONSTRAINT "FK_480f92a0b3aaf8f047d30569d33"`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP CONSTRAINT "FK_385a509b0b2040bb7a7391e1f66"`
    )
    await queryRunner.query(
      `DROP INDEX "organization"."IDX_480f92a0b3aaf8f047d30569d3"`
    )
    await queryRunner.query(
      `DROP INDEX "organization"."IDX_385a509b0b2040bb7a7391e1f6"`
    )
    await queryRunner.query(
      `CREATE TYPE "organization"."organizationMembers_type_enum" AS ENUM('OWNER', 'NORMAL')`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD "type" "organization"."organizationMembers_type_enum" NOT NULL DEFAULT 'NORMAL'`
    )
    await queryRunner.query(
      `CREATE TYPE "organization"."organizationMembers_status_enum" AS ENUM('ACTIVE', 'SUSPENDED')`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD "status" "organization"."organizationMembers_status_enum" NOT NULL DEFAULT 'ACTIVE'`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD "joinedAt" TIMESTAMP NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
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
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP COLUMN "updatedAt"`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP COLUMN "joinedAt"`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP COLUMN "status"`
    )
    await queryRunner.query(
      `DROP TYPE "organization"."organizationMembers_status_enum"`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" DROP COLUMN "type"`
    )
    await queryRunner.query(
      `DROP TYPE "organization"."organizationMembers_type_enum"`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_385a509b0b2040bb7a7391e1f6" ON "organization"."organizationMembers" ("orgId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_480f92a0b3aaf8f047d30569d3" ON "organization"."organizationMembers" ("userId") `
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD CONSTRAINT "FK_385a509b0b2040bb7a7391e1f66" FOREIGN KEY ("orgId") REFERENCES "organization"."organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "organization"."organizationMembers" ADD CONSTRAINT "FK_480f92a0b3aaf8f047d30569d33" FOREIGN KEY ("userId") REFERENCES "userIdm"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }
}
