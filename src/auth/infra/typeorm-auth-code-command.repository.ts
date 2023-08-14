import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCodeCommandRepository } from '../domain/repository/auth-code-command.repository';
import { AuthCode } from '../domain/entity/AuthCode';
import { AuthCodeType } from '../domain/enum/AuthCodeType';

@Injectable()
export class TypeormAuthCodeCommandRepository implements AuthCodeCommandRepository {
  constructor(
    @InjectRepository(AuthCode)
    private readonly authCodeRepository: Repository<AuthCode>,
  ) {}

  async save(authCode: AuthCode): Promise<AuthCode> {
    return await this.authCodeRepository.save(authCode);
  }

  async findByMemberIdAndType(memberId: number, type: AuthCodeType): Promise<AuthCode | null> {
    return await this.authCodeRepository.findOne({ where: { 'member.id': memberId, type: type } } as any);
  }

  async remove(authCode: AuthCode): Promise<void> {
    await this.authCodeRepository.remove(authCode);
  }
}
