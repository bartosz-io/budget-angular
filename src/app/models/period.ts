export class Period {
  constructor(public month: number, public year: number) { }

  public equals(period: Period | null) {
    if (period == null) {
      return false;
    }

    return this.month === period.month &&
      this.year === period.year;
  }
}
