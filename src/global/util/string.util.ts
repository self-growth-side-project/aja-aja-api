export class StringUtil {
  public static isEmpty(value: string | null | undefined): boolean {
    return !value || value.trim() === '';
  }

  public static reverse(value: string | null | undefined): string | null {
    if (this.isEmpty(value)) {
      return null;
    }

    value = value as string;

    return value.split('').reverse().join('');
  }
}
