export abstract class PagingCondition {
  page?: number | null | undefined;

  size?: number | null | undefined;

  protected constructor(page?: number | null | undefined, size?: number | null | undefined) {
    this.page = page;
    this.size = size;
  }

  getOffset(): number | undefined {
    if (this.page === null || this.page === undefined || this.size === null || this.size === undefined) {
      return;
    }

    return (this.page - 1) * this.size;
  }

  getLimit(): number | undefined {
    if (this.size === null || this.size === undefined) {
      return;
    }

    return this.size;
  }
}
