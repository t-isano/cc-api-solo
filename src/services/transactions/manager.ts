import {
  Repository,
  getRepository,
  DeleteResult,
  MoreThanOrEqual,
  LessThan,
} from "typeorm";
import Transaction from "../../entities/TransactionModel";
import { IManager } from "../common/manager";
import Account from "../../entities/AccountModel";

interface TransactionWithAccountId extends Transaction {
  accountId: string;
}

/**
 * Entity manager for User model
 * This is where you define logic to access data from database
 *
 * To read more about using a Manager object,
 * refer to UserManager class in `src/service/users/manager.ts`
 */
class TransactionManager implements IManager {
  protected transactionRepository: Repository<Transaction>;

  /**
   * FIXME
   * After defining the Account entity,
   * uncomment the lines in the constructor definition
   */
  constructor() {
    this.transactionRepository = getRepository(Transaction);
  }

  /**
   * FIXME
   * Get a transaction from database
   */
  public async getTransaction(transactionId: string): Promise<Transaction> {
    // return Promise.resolve(new Transaction());
    const tra = await this.transactionRepository.findOne({
      where: {
        id: transactionId,
      },
      relations: ["account"],
    });
    return tra;
  }

  /**
   * FIXME
   * Get a list of transactions with ids from database
   */
  public async listTransactionsByIds(
    transactionIds: string[]
  ): Promise<Transaction[]> {
    const tra = await this.transactionRepository.findByIds(transactionIds, {
      relations: ["account"],
    });
    return tra;
    // return Promise.resolve([]);
  }

  /**
   * FIXME
   * Get a list of transactions of a particular account
   */
  public async listTransactionsInAccount(
    accountId: string
  ): Promise<Transaction[]> {
    const tra = await this.transactionRepository.find({
      where: {
        account: accountId,
      },
      relations: ["account"],
    });
    return tra;
    // return Promise.resolve([]);
  }

  /**
   * FIXME
   * Get a list of transactions less than `maximumAmount` in a particular `account`
   */
  public async filterTransactionsByAmountInAccount(
    accountId: string,
    maximumAmount: number
  ): Promise<Transaction[]> {
    const tra = await this.transactionRepository.find({
      where: {
        account: accountId,
        amount: LessThan(maximumAmount),
      },
      relations: ["account"],
    });
    return tra;
    // return Promise.resolve([]);
  }

  /**
   * FIXME
   * create a new transaction
   */
  public async createTransaction(
    details: Partial<TransactionWithAccountId>
  ): Promise<Transaction> {
    const accountRepository = getRepository(Account);
    const account = await accountRepository.findOne(details.accountId);
    // // account.id = details.accountId;

    if (account) {
      const newTra = new Transaction();
      newTra.account = account;
      newTra.transactionDate = details.transactionDate || new Date();
      newTra.description = details.description;
      newTra.amount = details.amount;
      return this.transactionRepository.save(newTra);
    }

    // return undefined;
    // return Promise.resolve(new Transaction());
    // if ("accountId" in details) {
    //   details = {
    //     ...details,
    //     account: <any>{ id: details.accountId}
    //   };
    // }
    // return await this.transactionRepository.save(details);
    // return this.transactionRepository.findOne(details);
  }

  /**
   * update a transaction
   *
   * FIXME
   * 1. Remove the return statement
   * 2. Uncomment the remaining lines
   */
  public async updateTransaction(
    transactionId: string,
    changes: Partial<TransactionWithAccountId>
  ): Promise<Transaction> {
    if ("accountId" in changes) {
      changes = {
        ...changes,
        account: <any>{ id: changes.accountId },
      };
    }
    await this.transactionRepository.update(transactionId, changes);
    return this.transactionRepository.findOne(transactionId);
    // return Promise.resolve(new Transaction());
  }

  /**
   * FIXME
   * delete a transaction
   */
  public async deleteTransaction(transactionId): Promise<DeleteResult | void> {
    const tra = await this.transactionRepository.findOne(transactionId);
    if (tra) {
      const result = await this.transactionRepository.delete(tra);
      return Promise.resolve(result);
    }
    return Promise.resolve();
  }
}

export default TransactionManager;
