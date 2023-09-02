import { SortEnum } from '../../../domain/enum/sort.enum';
import { SortCondition } from '../../../domain/repository/dto/sort.condition';

export class SortRequest {
  field!: string;

  orderBy!: SortEnum;

  private constructor(field: string, orderBy: SortEnum) {
    this.field = field;
    this.orderBy = orderBy;
  }

  public static of(field: string, orderBy: string): SortRequest {
    return new SortRequest(field, SortEnum.findCode(orderBy));
  }

  public toCondition(): SortCondition {
    return new SortCondition(this.field, this.orderBy);
  }
}
