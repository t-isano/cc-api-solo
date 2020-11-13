import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import CharacterManager from "./manager";
import BaseController from "../common/controller";
import { guarded } from "../../authentication";

/**
 * FIXME
 * Advance requirements:
 * - All request handlers should verify if
 *   the authenticated user is authorized to
 *   perform operations on the specified User object
 */
class CharacterController extends BaseController {
  public path: string = "/users";
  public router: Router;

  protected manager: CharacterManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new CharacterManager();
  }

  /**
   * Using a factory method here
   */
  protected createRouter(): Router {
    const router = Router();

    router.get("/:charId", guarded(this.get));
    router.post("/", this.post);
    router.patch("/:charId", guarded(this.patch));
    router.delete("/:charId", guarded(this.delete));

    return router;
  }

  /**
   * HTTP GET request handler
   */
  protected get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId: charId } = req.params;
      const char = await this.manager.getCharcter(charId);
      if (!char) {
        res.status(404).send({ error: "character not found" });
        return;
      }

      res.json(
        _.pick(char, ["id", "realName", "superName", "genderId", "typesId"])
      );
    } catch (err) {
      // Delegate error handling to Express
      // with our custom error handler in
      // `src/middleware/errorHandler.ts`
      next(err);
    }
  };

  /**
   * HTTP POST request handler
   */
  protected post = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const charDetails = req.body;
      const char = await this.manager.createCharcter(charDetails);

      res.status(201).json(_.pick(char, ["id", "realName", "superName"]));
    } catch (err) {
      next(err);
    }
  };

  /**
   * HTTP PATCH request handler
   */
  protected patch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId: charId } = req.params;
      const newCharDetails = req.body;
      const updatedChar = await this.manager.updateCharacter(
        charId,
        newCharDetails
      );

      res.json(_.pick(updatedChar, ["id", "realName", "superName"]));
    } catch (err) {
      next(err);
    }
  };

  /**
   * HTTP DELETE request handler
   */
  protected delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { charId } = req.params;

    try {
      await this.manager.removeCharacter(charId);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  };
}

export default CharacterController;
