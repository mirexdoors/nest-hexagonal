import { AccountId } from '../../entities/account.entity';
import { MoneyEntity } from '../../entities/money.entity';

export class SendMoneyCommand {
  constructor(
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _money: MoneyEntity,
  ) {}

  get sourceAccountId(): string {
    return this._sourceAccountId;
  }

  get targetAccountId(): string {
    return this._targetAccountId;
  }

  get money(): MoneyEntity {
    return this._money;
  }
}
