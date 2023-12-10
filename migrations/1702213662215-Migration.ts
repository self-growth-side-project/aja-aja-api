import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702213662215 implements MigrationInterface {
    name = 'Migration1702213662215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` ADD \`wise_man_name\` varchar(50) NOT NULL COMMENT '성인 이름'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` DROP COLUMN \`wise_man_name\``);
    }

}
