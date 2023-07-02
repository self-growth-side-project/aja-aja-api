interface PasswordEncrypter {
  hash(password: string): Promise<string | null>;

  match(password: string, hashedPassword: string | null): Promise<boolean>;
}
