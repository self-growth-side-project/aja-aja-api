import { BaseTimeEntity } from '../../../global/common/domain/entity/BaseTimeEntity';
import { MemberRole } from '../enum/MemberRole';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MemberRoleTransformer } from '../transformer/MemberRoleTransformer';

@Entity()
export class Member extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  public readonly id: number | undefined;

  @Column({ name: 'email', type: 'varchar', length: 320 })
  public readonly email: string;

  @Column({ name: 'password', type: 'varchar', length: 60 })
  public readonly password: string | null;

  @Column({ name: 'role', type: 'varchar', length: 10, transformer: new MemberRoleTransformer() })
  public readonly role: MemberRole;

  private constructor(email: string, password: string | null, role: MemberRole);

  private constructor(email: string, password: string | null, role: MemberRole, id?: number | undefined);

  private constructor(email: string, password: string | null, role: MemberRole, id?: number | undefined) {
    super();
    this.email = email;
    this.password = password;
    this.role = role;
    this.id = id;
  }

  public static of(email: string, password: string | null, role: MemberRole): Member;

  public static of(email: string, password: string | null, role: MemberRole, id: number): Member;

  public static of(email: string, password: string | null, role: MemberRole, id?: number): Member {
    return new Member(email, password, role, id);
  }

  public static async signUpMember(email: string, password: string, encrypter: PasswordEncrypter): Promise<Member> {
    const hashedPassword = await encrypter.hash(password);
    return new Member(email, hashedPassword, MemberRole.MEMBER);
  }

  public async isMatchPassword(password: string, encrypter: PasswordEncrypter): Promise<boolean> {
    return await encrypter.match(password, this.password);
  }
}
