import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import validator from "validator";
import FilmManager from "./manager";
import BaseController from "../common/controller";
// import { guarded } from "../../authentication";

/**
 * FIXME
 * Advance requirements:
 * - All request handlers should verify if
 *   the authenticated user is authorized to
 *   perform operations on the specified User object
 */
class FilmController extends BaseController {
  public path: string = "/films";
  public router: Router;

  protected manager: FilmManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new FilmManager();
  }

  /**
   * Using a factory method here
   */
  protected createRouter(): Router {
    const router = Router();

    router.get("/", this.get);
    router.get("/:search", this.get);
    router.post("/", this.post);
    router.patch("/:filmId", this.patch);
    router.delete("/:filmId", this.delete);

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
        const film = await this.manager.getAllFilms();
        if (!film) {
          res.status(404).send({ error: "film not found" });
          return;
        }

        res.json(film);
      } else {
        // paramのcharIdがある場合、1人分取得する。
        const { search } = req.params;
        let film;
        if (validator.isUUID(search)) {
          //search が UUID 形式の場合
          film = await this.manager.getFilmById(search);
        } else {
          //search が UUID 形式ではない場合
          film = await this.manager.getFilmByName(search);
        }

        if (!film) {
          // IDで取得できない場合、nameで再取得
          res.status(404).send({ error: "film not found" });
          return;
        }

        res.json(film);
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
      const char = await this.manager.createFilm(charDetails);

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
      const { filmId } = req.params;
      const newFilmDetails = req.body;
      const updatedFilm = await this.manager.updateFilm(filmId, newFilmDetails);

      // res.json(_.pick(updatedChar, ["id", "realName", "superName"]));
      res.json(updatedFilm);
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
    const { filmId } = req.params;

    try {
      await this.manager.removeFilm(filmId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
}

export default FilmController;
