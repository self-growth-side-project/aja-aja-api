import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1703121683853 implements MigrationInterface {
    name = 'Migration1703121683853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`withdrawn_member\` ADD \`joined_at\` timestamp(3) NOT NULL COMMENT '가입 일시'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`withdrawn_member\` DROP COLUMN \`joined_at\``);
    }

}
