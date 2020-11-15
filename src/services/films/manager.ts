import bcrypt from "bcrypt";
import { getRepository, Repository, DeleteResult } from "typeorm";
import Films from "../../entities/FilmModel";
import { IManager } from "../common/manager";
import { useRefreshDatabase } from "typeorm-seeding";

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
class FilmManager implements IManager {
  protected filmsRepository: Repository<Films>;

  constructor() {
    this.filmsRepository = getRepository(Films);
  }

  /**
   * Get character by primary key
   *
   * FIXME
   */
  public async getAllFilms(): Promise<Films[]> {
    const film = await this.filmsRepository.find();
    // if (!char) {
    //   throw new Error("charcter not found");
    // }

    return film;
    // return Promise.resolve(new User());
  }

  public async getFilmById(search: string): Promise<Films> {
    const char = await this.filmsRepository.findOne({ id: search });
    if (!char) {
      throw new Error("film not found");
    }

    return char;
  }

  public async getFilmByName(search: string): Promise<Films> {
    let char = await this.filmsRepository.findOne({ name: search });
    if (!char) {
      throw new Error("film not found");
    }

    return char;
  }

  /**
   * Create a new user
   */
  public async createFilm(
    // charDetails: Partial<CharactersInput>
    filmDetails: Partial<Films>
  ): Promise<Films> {
    // // 1. Hash password
    // const saltRound = 10;
    // const passwordHash = await bcrypt.hash(charDetails.password, saltRound);

    // 2. Create user
    const newFilm = new Films();
    newFilm.id = filmDetails.id;
    newFilm.name = filmDetails.name;
    newFilm.releasedYear = filmDetails.releasedYear;

    return this.filmsRepository.save(newFilm);
  }

  /**
   * Update user details
   *
   * FIXME
   */
  public async updateFilm(
    filmId: string,
    updates: Partial<Films>
  ): Promise<Films> {
    // const user = await this.userRepository.findOne( userId );
    const film = await this.getFilmById(filmId);
    // if (!user) {
    //   throw new Error("userId not found");
    // }

    // 更新があれば上書き（？）
    film.id = updates.id || film.id;
    film.name = updates.name || film.name;
    film.releasedYear = updates.releasedYear || film.releasedYear;

    return this.filmsRepository.save(film);
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
  public async removeFilm(filmId: string): Promise<DeleteResult | void> {
    // const user = await this.userRepository.findOne( userId );
    const film = await this.getFilmById(filmId);
    // if (!user) {
    //   throw new Error("userId not found");
    // }

    await this.filmsRepository.remove(film);
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

export default FilmManager;
