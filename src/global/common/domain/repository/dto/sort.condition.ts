import { SortEnum } from '../../enum/sort.enum';

export class SortCondition {
  field!: string;

  orderBy!: SortEnum;

  constructor(field: string, orderBy: SortEnum) {
    this.field = field;
    this.orderBy = orderBy;
  }
}
