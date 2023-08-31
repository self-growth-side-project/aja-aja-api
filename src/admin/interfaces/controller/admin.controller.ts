import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/dto/response/base.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../../../auth/guard/role.guard';
import { Role } from '../../../auth/guard/role.decorator';
import { MemberRole } from '../../../member/domain/enum/MemberRole';

@Controller('/admin')
export class AdminController {
  @Version('1')
  @Role(MemberRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/members')
  async getMembers(): Promise<BaseResponse<Void>> {
    return BaseResponse.voidBaseResponse();
  }
}
