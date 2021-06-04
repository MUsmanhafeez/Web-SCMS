import { MigrationInterface, QueryRunner } from 'typeorm'

export class createOrganizationSchema1608378099237
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "organization"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA "organization"`)
  }
}
