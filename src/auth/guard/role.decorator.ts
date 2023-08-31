import { MemberRole } from '../../member/domain/enum/MemberRole';
import { SetMetadata } from '@nestjs/common';

export const Role = (role: MemberRole) => SetMetadata('role', role);
