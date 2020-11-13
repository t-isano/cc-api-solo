import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import User from "../../entities/UserModel";
import { IManager } from "../common/manager";
import { useRefreshDatabase } from "typeorm-seeding";

interface UserInput extends User {
  password: string;
}

/**
 * Entity manager for User model
 * This is where you define logic to access data from database
 *
 * A Manager object is to be consumed by:
 * - the Controller
 * - controllers or managers of other services (Auth, Accounts, Transactions, etc)
 *
 * Software Design Tips:
 * - We're using a software design pattern called the façade pattern.
 *   All manipulation of User objects should go through this UserManager.
 *   Such software design provides several benefits:
 *   - it makes testing and future refactoring easier
 *   - it facilitates DRY code
 *   - it provides a simple interface for other controllers or services to consume our main entity (User)
 *   - it abstracts away the complexity of dealing with User model
 */
class UserManager implements IManager {
  protected userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  /**
   * Get user by primary key
   *
   * FIXME
   */
  public async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    // if (!user) {
    //   throw new Error("userId not found");
    // }

    return user;
    // return Promise.resolve(new User());
  }

  /**
   * Create a new user
   */
  public async createUser(userDetails: Partial<UserInput>): Promise<User> {
    // 1. Hash password
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(userDetails.password, saltRound);

    // 2. Create user
    const newUser = new User();
    newUser.username = userDetails.username;
    newUser.passwordHash = passwordHash;

    return this.userRepository.save(newUser);
  }

  /**
   * Update user details
   *
   * FIXME
   */
  public async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    // const user = await this.userRepository.findOne( userId );
    const user = await this.getUser(userId);
    // if (!user) {
    //   throw new Error("userId not found");
    // }

    // 更新があれば上書き（？）
    user.id = updates.id || user.id;
    user.username = updates.username || user.username;
    user.passwordHash = updates.passwordHash || user.passwordHash;
    user.displayName = updates.displayName || user.displayName;

    return this.userRepository.save(user);
  }

  /**
   * Delete user
   *
   * Basic Requirements:
   * - Delete User from database
   *
   * Advanced Requirements:
   * - Soft delete user from database
   *
   * FIXME
   */
  public async removeUser(userId: string): Promise<DeleteResult | void> {
    // const user = await this.userRepository.findOne( userId );
    const user = await this.getUser(userId);
    // if (!user) {
    //   throw new Error("userId not found");
    // }

    await this.userRepository.remove(user);
  }

  /**
   * Verifies username and password
   *
   * Pseudocode:
   * - IF the username and password matches -> returns the User object
   * - ELSE -> returns null
   */
  public async verifyAndGetUser(
    username: string,
    password: string
  ): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new Error("username not found");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new Error("password incorrect");
    }

    return user;
  }
}

export default UserManager;
