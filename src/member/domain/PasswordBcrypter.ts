import { BcryptUtil } from '../../global/util/bcrypt.util';

export class PasswordBcrypter implements PasswordEncrypter {
  async hash(password: string): Promise<string> {
    return await BcryptUtil.hash(password);
  }

  async match(password: string, hashedPassword: string): Promise<boolean> {
    return await BcryptUtil.match(password, hashedPassword);
  }
}
