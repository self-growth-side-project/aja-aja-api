import { RefreshToken } from '../entity/refresh-token.entity';

export interface RefreshTokenCommandRepository {
  save(authCode: RefreshToken): Promise<RefreshToken>;
}

export const RefreshTokenCommandRepository = Symbol('RefreshTokenCommandRepository');
