import { MigrationInterface, QueryRunner } from 'typeorm'

export class createUserIdmSchema1608378099232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "userIdm"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA "userIdm"`)
  }
}
