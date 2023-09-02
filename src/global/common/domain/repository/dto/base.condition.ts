import { SortCondition } from './sort.condition';
import { SortEnum } from '../../enum/sort.enum';

export abstract class BaseCondition {
  page?: number | null | undefined;

  size?: number | null | undefined;

  lastId?: number | null | undefined;

  _sort?: SortCondition[] | null | undefined;

  protected constructor(
    page?: number | null | undefined,
    size?: number | null | undefined,
    lastId?: number | null | undefined,
    sort?: SortCondition[] | null | undefined,
  ) {
    this.page = page;
    this.size = size;
    this.lastId = lastId;
    this._sort = sort;
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

  getLastId(): number | undefined {
    if (this.lastId === null || this.lastId === undefined) {
      return;
    }

    return this.lastId;
  }

  get sort(): SortCondition[] {
    if (!this._sort || this._sort.length < 1) {
      return [new SortCondition('id', SortEnum.DESC)];
    }

    return this._sort;
  }
}
