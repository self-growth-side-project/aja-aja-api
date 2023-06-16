export class StringUtil {
  public static isEmpty(value: string): boolean {
    return !value || value.trim() === '';
  }

  public static reverse(value: string): string {
    if (this.isEmpty(value)) {
      return null;
    }

    return value.split('').reverse().join('');
  }
}
