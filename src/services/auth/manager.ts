import jwt from "jsonwebtoken";
import CharacterManager from "../characters/manager";
import User from "../../entities/CharacterModel";
import { IManager } from "../common/manager";

class AuthManager implements IManager {
  protected secret: string;
  protected userManager: CharacterManager;

  constructor(secret: string) {
    this.secret = secret;
    this.userManager = new CharacterManager();
  }

  // /**
  //  * Generate JWT token
  //  */
  // public async generateJwtToken(username: string, password: string): Promise<string> {
  //   try {
  //     const user: User = await this.userManager.verifyAndGetUser(username, password);
  //     if (!user) {
  //       throw new Error("username pr password mismatched");
  //     }

  //     const token: string = jwt.sign(
  //       /* JWT payload */ {
  //         exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
  //         data: user, // User object
  //       },
  //       /* JWT secret */ this.secret,
  //     );

  //     return token;
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // }

  /**
   * - Verifies JWT token and return the User object
   */
  public async verifyTokenAndGetUser(token: string): Promise<User> {
    try {
      const payload: { [key: string]: any } = jwt.verify(
        token,
        this.secret
      ) as { [key: string]: any };
      const user: User = await this.userManager.getCharcter(
        payload.id || payload.data.id
      );
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default AuthManager;
