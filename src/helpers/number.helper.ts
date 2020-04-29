export class NumberHelper {
  public static isBetween(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }
}
