import { LoadAccountPort } from '../ports/out/load-account.port';
import { UpdateAccountStatePort } from '../ports/out/update-account-state.port';
import { SendMoneyUseCase } from '../ports/in/send-money.use-case';
import { AccountEntity } from '../entities/account.entity';
import { SendMoneyCommand } from '../ports/in/send-money.command';

export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountStatePort: UpdateAccountStatePort,
  ) {}

  async sendMoney(command: SendMoneyCommand) {
    const sourceAccount: AccountEntity =
      await this._loadAccountPort.loadAccount(command.sourceAccountId);

    const targetAccount: AccountEntity =
      await this._loadAccountPort.loadAccount(command.targetAccountId);

    if (!sourceAccount.withdraw(command.money, targetAccount.id)) {
      return false;
    }

    if (!targetAccount.deposite(command.money, sourceAccount.id)) {
      return false;
    }

    this._updateAccountStatePort.updateActivities(sourceAccount);
    this._updateAccountStatePort.updateActivities(targetAccount);

    return true;
  }
}
