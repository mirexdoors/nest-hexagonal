import { Global, Module } from '@nestjs/common';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from './account.orm-entity';
import { ActivityOrmEntity } from './activity.orm-entity';
import { SendMoneyUseCaseSymbol } from '../../domains/ports/in/send-money.use-case';
import { SendMoneyService } from '../../domains/servicies/send-money.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity, ActivityOrmEntity])],
  providers: [
    AccountPersistenceAdapter,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (AccountPersistenceAdapter) => {
        return new SendMoneyService(
          AccountPersistenceAdapter,
          AccountPersistenceAdapter,
        );
      },
      inject: [AccountPersistenceAdapter],
    },
  ],
  exports: [SendMoneyUseCaseSymbol],
})
export class AccountPersistenceModule {}
