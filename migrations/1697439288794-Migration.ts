import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1697439288794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`test1\``);
    await queryRunner.query(`DROP TABLE \`test2\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`test1\` (\`created_at\` timestamp(3) NOT NULL COMMENT '생성 일시' DEFAULT CURRENT_TIMESTAMP(3), \`updated_at\` timestamp(3) NOT NULL COMMENT '수정 일시' DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '고유 식별 ID', \`test\` varchar(320) NOT NULL COMMENT 'test', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`test2\` (\`created_at\` timestamp(3) NOT NULL COMMENT '생성 일시' DEFAULT CURRENT_TIMESTAMP(3), \`updated_at\` timestamp(3) NOT NULL COMMENT '수정 일시' DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '고유 식별 ID', \`test\` varchar(320) NOT NULL COMMENT 'test', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }
}
