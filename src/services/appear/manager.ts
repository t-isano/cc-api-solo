import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import Appear from "../../entities/AppearModel";
import { IManager } from "../common/manager";
import { useRefreshDatabase } from "typeorm-seeding";

interface CharactersInput extends Appear {
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
class AppearManager implements IManager {
  protected appearRepository: Repository<Appear>;

  constructor() {
    this.appearRepository = getRepository(Appear);
  }

  /**
   * Get character by primary key
   *
   * FIXME
   */
  // public async getAllCharacters(): Promise<Appear[]> {
  //   const char = await this.appearRepository.find();
  //   // if (!char) {
  //   //   throw new Error("charcter not found");
  //   // }

  //   return char;
  //   // return Promise.resolve(new User());
  // }

  public async getAppearsByCharcterId(search: string): Promise<Appear[]> {
    const appear = await this.appearRepository.find({
      where: {
        character: search,
      },
      relations: ["film"],
    });
    console.info(appear);
    // const appear = await this.appearRepository.findByIds(search, {
    //   relations: ["characters"]
    // });
    if (!appear) {
      // throw new Error("appear not found");
    }

    return appear;
  }

  // public async getCharcterByName(search: string): Promise<Appear> {
  // let char = await this.charactersRepository.findOne({ realName: search });
  // if (!char) {
  //   char = await this.charactersRepository.findOne({ superName: search });
  //   if (!char) {
  //     throw new Error("charcterId not found");
  //   }
  // }

  // return char;
  // }

  /**
   * Create a new user
   */
  public async createCharcter(
    // charDetails: Partial<CharactersInput>
    appearDetails: Partial<Appear>
  ): Promise<Appear> {
    // // 1. Hash password
    // const saltRound = 10;
    // const passwordHash = await bcrypt.hash(charDetails.password, saltRound);

    // 2. Create user
    const newAppear = new Appear();
    newAppear.id = appearDetails.id;
    newAppear.character = appearDetails.character;
    newAppear.film = appearDetails.film;

    return this.appearRepository.save(newAppear);
  }

  /**
   * Update user details
   *
   * FIXME
   */
  // public async updateCharacter(
  //   charId: string,
  //   updates: Partial<Appear>
  // ): Promise<Appear> {
  //   // const user = await this.userRepository.findOne( userId );
  //   const appear = await this.getCharcterById(charId);
  //   // if (!user) {
  //   //   throw new Error("userId not found");
  //   // }

  //   // 更新があれば上書き（？）
  //   appear.id = updates.id || appear.id;
  //   appear.character = updates.character || appear.character;
  //   appear.film = updates.film || appear.film;

  //   return this.appearRepository.save(appear);
  // }

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
  // public async removeCharacter(charId: string): Promise<DeleteResult | void> {
  //   // const user = await this.userRepository.findOne( userId );
  //   const char = await this.getCharcterById(charId);
  //   // if (!user) {
  //   //   throw new Error("userId not found");
  //   // }

  //   await this.appearRepository.remove(char);
  // }

  /**
   * Verifies username and password
   *
   * Pseudocode:
   * - IF the username and password matches -> returns the User object
   * - ELSE -> returns null
   */
  // public async verifyAndGetUser(username: string, password: string): Promise<User> {
  //   const user = await this.charactersRepository.findOne({ username });
  //   if (!user) {
  //     throw new Error("username not found");
  //   }

  //   const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  //   if (!passwordMatches) {
  //     throw new Error("password incorrect");
  //   }

  //   return user;
  // }
}

export default AppearManager;
