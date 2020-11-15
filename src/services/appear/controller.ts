import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import validator from "validator";
import AppearManager from "./manager";
import BaseController from "../common/controller";
// import { guarded } from "../../authentication";

/**
 * FIXME
 * Advance requirements:
 * - All request handlers should verify if
 *   the authenticated user is authorized to
 *   perform operations on the specified User object
 */
class AppearController extends BaseController {
  public path: string = "/appear";
  public router: Router;

  protected manager: AppearManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new AppearManager();
  }

  /**
   * Using a factory method here
   */
  protected createRouter(): Router {
    const router = Router();

    router.get("/:search", this.get);
    router.post("/", this.post);
    router.patch("/:search", this.patch);
    router.delete("/:search", this.delete);

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
      if (!req.params.search) {
        // paramのsearchがない場合、全県取得
        // const char = await this.manager.getAllCharacters();
        // if (!char) {
        //   res.status(404).send({ error: "character not found" });
        //   return;
        // }
        // res.json(char);
      } else {
        // paramのsearchがある場合、search(charId）に紐付いた出演を取得する。
        const { search } = req.params;
        let appear;
        if (validator.isUUID(search)) {
          //search が UUID 形式の場合
          appear = await this.manager.getAppearsByCharcterId(search);
        } else {
          //search が UUID 形式ではない場合
          // char = await this.manager.getCharcterByName(search);
        }

        if (!appear) {
          // IDで取得できない場合、nameで再取得
          res.status(404).send({ error: "appear not found" });
          return;
        }

        res.json(appear);
        // res.json(_.pick(
        //   char, ["id", "realName", "superName", "genderId", "typesId"]
        // ));
      }
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

      // res.status(201).json(_.pick(char, ["id", "realName", "superName"]));
      res.status(201).json(char);
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
      const { charId } = req.params;
      const newCharDetails = req.body;
      // const updatedChar = await this.manager.updateCharacter(
      //   charId,
      //   newCharDetails
      // );

      // res.json(_.pick(updatedChar, ["id", "realName", "superName"]));
      // res.json(updatedChar);
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

    // try {
    //   await this.manager.removeCharacter(charId);
    //   res.status(204).end();
    // } catch (err) {
    //   next(err);
    // }
  };
}

export default AppearController;
