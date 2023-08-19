import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCodeCommandRepository } from '../domain/repository/auth-code-command.repository';
import { AuthCode } from '../domain/entity/AuthCode';
import { AuthCodeType } from '../domain/enum/AuthCodeType';
import { TimeUtil } from '../../global/util/time.util';

@Injectable()
export class TypeormAuthCodeCommandRepository implements AuthCodeCommandRepository {
  constructor(
    @InjectRepository(AuthCode)
    private readonly authCodeRepository: Repository<AuthCode>,
  ) {}

  async save(authCode: AuthCode): Promise<AuthCode> {
    return await this.authCodeRepository.save(authCode);
  }

  async findAllByMemberIdAndTypeAndCreatedAtToday(memberId: number, type: AuthCodeType): Promise<AuthCode[]> {
    const from = TimeUtil.getStartOfTodayInKSTAsUTC();
    const to = TimeUtil.getEndOfTodayInKSTAsUTC();

    return await this.authCodeRepository.find({
      where: {
        'member.id': memberId,
        type: type,
        createdAt: Between(from, to),
      },
    } as any);
  }

  async findByCode(code: string): Promise<AuthCode | null> {
    return await this.authCodeRepository.findOne({ where: { code: code } } as any);
  }

  async remove(authCode: AuthCode): Promise<void> {
    await this.authCodeRepository.remove(authCode);
  }
}
