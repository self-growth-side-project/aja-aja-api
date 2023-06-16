interface PasswordEncrypter {
  hash(password: string): Promise<string>;

  match(password: string, hashedPassword: string): Promise<boolean>;
}
