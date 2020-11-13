import {
  Repository,
  getRepository,
  DeleteResult,
  Connection,
  createQueryBuilder,
} from "typeorm";
import Account from "../../entities/AccountModel";
import { IManager } from "../common/manager";

interface AccountWithBalance extends Account {
  balance: number;
}

class AccountManager implements IManager {
  protected accountRepository: Repository<Account>;

  /**
   * FIXME
   * After defining the Account entity,
   * uncomment the lines in the constructor definition
   */
  constructor() {
    this.accountRepository = getRepository(Account);
  }

  /**
   * FIXME
   * Get an account
   *
   * Requirements:
   * - Derive balance (both debit and credit)
   */

  public async getAccount(accountId: string): Promise<AccountWithBalance> {
    // You are free to remove any lines below
    let blankAccount = undefined;

    const existAccount = await this.accountRepository.findOne(accountId);

    // FIXME Your should derive account balance by aggregating all the transactions
    // let accountBalanceDerived = 0.0;

    // for (let i in balance) {
    //   accountBalanceDerived += Number.parseFloat(i);
    // }
    // accountBalanceDerived = await this.accountRepository
    //               .createQueryBuilder("transaction")
    //               .select("SUM(transaction.amount)", "sum")
    //               .where("transaction.accountId= :id", {id: accountId})
    //               .getRawOne();
    if (existAccount) {
      blankAccount = <AccountWithBalance>new Account();
      let accountBalanceDerived = 0.0;

      blankAccount.id = existAccount.id;
      blankAccount.name = existAccount.name;
      blankAccount.owner = existAccount.owner;
      blankAccount.transactions = existAccount.transactions;

      if (existAccount.transactions) {
        accountBalanceDerived = existAccount.transactions.reduce(
          (sum, cur) => sum + cur.amount,
          0.0
        );
      }

      // const amounts = await this.accountRepository.find({
      //   where: {
      //     account: "transaciton.id"
      //   },
      //   relations: ["transaction"]
      // });
      // for (let i in amounts) {
      //   accountBalanceDerived += Number.parseFloat(i);
      // }

      blankAccount.balance = accountBalanceDerived;

      return blankAccount;
    }
    // return Promise.resolve(blankAccount);
    // return blankAccount;
    return blankAccount;
  }

  /**
   * FIXME
   * create a new account
   */
  public async createAccount(details: Partial<Account>): Promise<Account> {
    // return Promise.resolve(new Account());
    const newAccount = new Account();
    newAccount.name = details.name;
    newAccount.owner = details.owner;

    return this.accountRepository.save(newAccount);
  }

  /**
   * FIXME
   * update account details
   */
  public async updateAccount(
    accountId: string,
    changes: Partial<Account>
  ): Promise<Account> {
    const account = await this.accountRepository.findOne(accountId);

    // 更新があれば上書き
    account.id = changes.id || account.id;
    account.name = changes.name || account.name;
    account.transactions = changes.transactions || account.transactions;
    account.owner = changes.owner || account.owner;

    return this.accountRepository.save(account);
    // return Promise.resolve(new Account());
  }

  /**
   * FIXME
   * delete account
   *
   * Requirements:
   * - Cascade and delete all transactions
   */
  public async deleteAccount(accountId: string): Promise<DeleteResult | void> {
    const account = await this.accountRepository.findOne(accountId);
    if (account) {
      const result = await this.accountRepository.delete(account);
      return Promise.resolve(result);
    }

    // await this.accountRepository.delete(account);
    // await this.accountRepository.delete({id: accountId});
    // const delUser = await this.accountRepository.createQueryBuilder().delete()
    //       .from(Account)
    //       .where('id = :id', { id: accountId })
    //       .execute();
    return Promise.resolve();
  }
}

export default AccountManager;
