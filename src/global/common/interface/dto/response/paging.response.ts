import { Exclude, Expose } from 'class-transformer';

export class PagingResponse<T> {
  @Exclude({ toPlainOnly: true }) private readonly _page: number;
  @Exclude({ toPlainOnly: true }) private readonly _size: number;
  @Exclude({ toPlainOnly: true }) private readonly _totalElements: number;
  @Exclude({ toPlainOnly: true }) private readonly _numberOfElements: number;
  @Exclude({ toPlainOnly: true }) private readonly _items: T[];

  @Expose()
  get page(): number {
    return this._page;
  }

  @Expose()
  get size(): number {
    return this._size;
  }

  @Expose()
  get totalElements(): number {
    return this._totalElements;
  }

  @Expose()
  get numberOfElements(): number {
    return this._numberOfElements;
  }

  @Expose()
  get totalPages(): number {
    return Math.ceil(this._totalElements / this._size);
  }

  @Expose()
  get items(): T[] {
    return this._items;
  }

  constructor(page: number, size: number, totalElements: number, numberOfElements: number, items: T[]) {
    this._page = page;
    this._size = size;
    this._totalElements = totalElements;
    this._numberOfElements = numberOfElements;
    this._items = items;
  }
}
