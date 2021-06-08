import { AccountId } from './account.entity';
import { MoneyEntity } from './money.entity';

export class ActivityEntity {
  constructor(
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _timestamp: Date,
    private readonly _money: MoneyEntity,
  ) {}

  get sourceAccountId(): string {
    return this._sourceAccountId;
  }

  get targetAccountId(): string {
    return this._targetAccountId;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get money(): MoneyEntity {
    return this._money;
  }
}
