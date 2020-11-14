import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import Characters from "../../entities/CharacterModel";
import { IManager } from "../common/manager";
import { useRefreshDatabase } from "typeorm-seeding";

interface CharactersInput extends Characters {
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
class CharacterManager implements IManager {
  protected charactersRepository: Repository<Characters>;

  constructor() {
    this.charactersRepository = getRepository(Characters);
  }

  /**
   * Get character by primary key
   *
   * FIXME
   */
  public async getAllCharacters(): Promise<Characters[]> {
    const char = await this.charactersRepository.find();
    // if (!char) {
    //   throw new Error("charcter not found");
    // }

    return char;
    // return Promise.resolve(new User());
  }

  public async getCharcterById(search: string): Promise<Characters> {
    const char = await this.charactersRepository.findOne({ id: search });
    if (!char) {
      throw new Error("charcterId not found");
    }

    return char;
  }

  public async getCharcterByName(search: string): Promise<Characters> {
    let char = await this.charactersRepository.findOne({ realName: search });
    if (!char) {
      char = await this.charactersRepository.findOne({ superName: search });
      if (!char) {
        throw new Error("charcterId not found");
      }
    }

    return char;
  }

  /**
   * Create a new user
   */
  public async createCharcter(
    // charDetails: Partial<CharactersInput>
    charDetails: Partial<Characters>
  ): Promise<Characters> {
    // // 1. Hash password
    // const saltRound = 10;
    // const passwordHash = await bcrypt.hash(charDetails.password, saltRound);

    // 2. Create user
    const newChar = new Characters();
    newChar.id = charDetails.id;
    newChar.realName = charDetails.realName;
    newChar.superName = charDetails.superName;
    newChar.genderId = charDetails.genderId;
    newChar.typesId = charDetails.typesId;

    return this.charactersRepository.save(newChar);
  }

  /**
   * Update user details
   *
   * FIXME
   */
  public async updateCharacter(
    charId: string,
    updates: Partial<Characters>
  ): Promise<Characters> {
    // const user = await this.userRepository.findOne( userId );
    const char = await this.getCharcterById(charId);
    // if (!user) {
    //   throw new Error("userId not found");
    // }

    // 更新があれば上書き（？）
    char.id = updates.id || char.id;
    char.realName = updates.realName || char.realName;
    char.superName = updates.superName || char.superName;
    char.genderId = updates.genderId || char.genderId;
    char.typesId = updates.typesId || char.typesId;

    return this.charactersRepository.save(char);
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
  public async removeCharacter(charId: string): Promise<DeleteResult | void> {
    // const user = await this.userRepository.findOne( userId );
    const char = await this.getCharcterById(charId);
    // if (!user) {
    //   throw new Error("userId not found");
    // }

    await this.charactersRepository.remove(char);
  }

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

export default CharacterManager;
