/**
 * Disclaimer
 *
 * You will notice these test cases are verbose,
 * and can sometimes be refactored and broken down
 * to smaller functions. However, for the sake of
 * learning, and given the complexity of this sprint,
 * test cases here will be as verbose as possible to
 * give you a clear trail of what these tests are trying
 * to achieve
 */
import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { Application } from "express";
import { getRepository, Repository, Not, IsNull } from "typeorm";
import { v4 as uuid4 } from "uuid";
import DatabaseConnectionManager from "../database";
import { getDefaultApp } from "../app";
import Characters from "../entities/CharacterModel";
import Appear from "../entities/AppearModel";
import Films from "../entities/FilmModel";

chai.use(chaiHttp);

const expect = chai.expect;

describe("mcu manager", () => {
  // for test
  const APP_SECRET = "xxxyyyxxxyyy";
  const TEST_CHAR_ID = "3461cac2-35bd-4d45-a163-f220beb43d76";
  const TEST_POST_ID = "655f6179-543f-45e7-a4ae-69bd9f179c52";
  const TONY_ID = "daa974de-5f6e-4322-9919-e659326de0ac";
  const CIVIL_WAR_ID = "898afa22-0389-4686-b93b-d18e124d3abc";
  const TEST_FILM_ID = "655f6180-543f-45e7-a4ae-69bd9f179c52";
  const TEST_FILM_ID_SETUP = "666f6180-543f-45e7-a4ae-69bd9f179c52";
  const TEST_APPEAR_ID_SETUP = "777f6180-543f-45e7-a4ae-69bd9f179c52";

  let app: Application;
  let charRepo: Repository<Characters>;
  let filmRepo: Repository<Films>;
  let appearRepo: Repository<Appear>;
  // let accountRepo: Repository<Account>;
  // let transactionRepo: Repository<Transaction>;

  before(async () => {
    await DatabaseConnectionManager.connect();

    app = getDefaultApp(APP_SECRET).app;
    charRepo = getRepository(Characters);
    filmRepo = getRepository(Films);
    appearRepo = getRepository(Appear);
  });

  after(async () => {
    // await charRepo.delete({ id: Not(IsNull()) });
    await charRepo.delete({ id: TEST_CHAR_ID });
    await charRepo.delete({ id: TEST_POST_ID });

    await filmRepo.delete({ id: TEST_FILM_ID_SETUP });

    await appearRepo.delete({ id: TEST_APPEAR_ID_SETUP });
  });

  beforeEach(async () => {
    /**
     * Restore our test user
     * username: tester
     * password: tester
     */
    let testChar = new Characters();
    testChar.id = TEST_CHAR_ID;
    testChar.realName = "tester";
    testChar.superName = "Super-Test";
    testChar.genderId = 2;
    testChar.typesId = 2;
    testChar = await charRepo.save(testChar);

    let testFilm = new Films();
    testFilm.id = TEST_FILM_ID_SETUP;
    testFilm.name = "Test Avengers:";
    testFilm.releasedYear = 2030;
    testFilm = await filmRepo.save(testFilm);

    /**
     * Advanced Requirements:
     * - Create and use a dedicated test database
     */
  });

  describe("character services", () => {
    // it("should restrict access by unauthenticated user", async () => {
    it("should get a character by id", async () => {
      const res = await chai.request(app).get(`/characters/${TEST_CHAR_ID}`);
      expect(res).to.have.status(200);
      const expected = {
        id: TEST_CHAR_ID,
        realName: "tester",
        superName: "Super-Test",
        genderId: 2,
        typesId: 2,
      };
      expect(res.body).to.deep.equal(expected);
    });

    it("should get a character by real name", async () => {
      const testHeroName = "Tony Stark";
      const res = await chai.request(app).get(`/characters/${testHeroName}`);
      expect(res).to.have.status(200);
      expect(res.body.realName).to.deep.equal(testHeroName);
    });

    it("should get a character by super name", async () => {
      const testHeroName = "Iron Man";
      const res = await chai.request(app).get(`/characters/${testHeroName}`);
      expect(res).to.have.status(200);
      expect(res.body.superName).to.deep.equal(testHeroName);
    });

    it("should get all characters", async () => {
      const res = await chai.request(app).get(`/characters/`);
      expect(res).to.have.status(200);
      const expected = await charRepo.find();
      expect(res.body).to.deep.equal(expected);
    });

    it("should post to create a new character", async () => {
      const res = await chai.request(app).post(`/characters/`).send({
        id: TEST_POST_ID,
        realName: "Test Post",
        superName: "Super-TestPost",
        genderId: 2,
        typesId: 2,
      });
      expect(res).to.have.status(201);
      const expected = await charRepo.findOne(TEST_POST_ID);
      expect(res.body).to.deep.equal(expected);
    });

    it("should patch to udpate a character", async () => {
      // Setup
      const patchChar = {
        realName: "Test Patch",
        superName: "Super-TestPatch",
      };

      // Exercise
      const res = await chai
        .request(app)
        .patch(`/characters/${TEST_POST_ID}`)
        .send(patchChar);
      expect(res).to.have.status(200);
      const expected = await charRepo.findOne(TEST_POST_ID);
      expect(res.body).to.deep.equal(expected);
    });

    it("should delete to remove a character", async () => {
      // Setup

      // Exercise
      const res = await chai.request(app).delete(`/characters/${TEST_POST_ID}`);
      expect(res).to.have.status(204);
    });
  });

  describe("films services", () => {
    it("should get all films", async () => {
      // const res = await chai.request(app).get(`/films/${CIVIL_WAR_ID}`);
      const res = await chai.request(app).get(`/films/`);
      expect(res).to.have.status(200);

      const expected = await filmRepo.find();
      expect(res.body).to.deep.equal(expected);
    });

    it("should get a film by filmId", async () => {
      const res = await chai.request(app).get(`/films/${CIVIL_WAR_ID}`);
      expect(res).to.have.status(200);

      const expected = await filmRepo.findOne(CIVIL_WAR_ID);
      expect(res.body).to.deep.equal(expected);
    });

    it("should get a film by name", async () => {
      const res = await chai
        .request(app)
        .get(`/films/Captain America: Civil War`);
      expect(res).to.have.status(200);

      const expected = await filmRepo.findOne({
        name: "Captain America: Civil War",
      });
      expect(res.body).to.deep.equal(expected);
    });

    it("should post to create a new film", async () => {
      const res = await chai.request(app).post(`/films/`).send({
        id: TEST_FILM_ID,
        name: "Test Black Widow",
        releasedYear: 2021,
      });
      expect(res).to.have.status(201);
      const expected = await filmRepo.findOne(TEST_FILM_ID);
      expect(res.body).to.deep.equal(expected);
    });

    it("should patch to udpate a film", async () => {
      // Setup
      const patchFilm = {
        name: "Test Patch Avengers",
        releasedYear: 2050,
      };

      // Exercise
      const res = await chai
        .request(app)
        .patch(`/films/${TEST_FILM_ID_SETUP}`)
        .send(patchFilm);
      expect(res).to.have.status(200);
      const expected = await filmRepo.findOne(TEST_FILM_ID_SETUP);
      expect(res.body).to.deep.equal(expected);
    });

    it("should delete to remove a film", async () => {
      // Setup

      // Exercise
      const res = await chai
        .request(app)
        .delete(`/films/${TEST_FILM_ID_SETUP}`);
      expect(res).to.have.status(204);
    });
  });

  describe("appear services", () => {
    it("should get a appear by charId", async () => {
      const res = await chai.request(app).get(`/appear/${TONY_ID}`);
      expect(res).to.have.status(200);

      const expected = await appearRepo.find({
        where: {
          character: TONY_ID,
        },
        relations: ["film"],
      });

      expect(res.body).to.deep.equal(expected);
    });

    it("should post to create a new appear", async () => {
      const res = await chai.request(app).post(`/appear/`).send({
        id: TEST_APPEAR_ID_SETUP,
        characterId: TONY_ID,
        filmId: CIVIL_WAR_ID,
      });
      expect(res).to.have.status(201);
      const expected = await appearRepo.findOne(TEST_APPEAR_ID_SETUP);
      expect(res.body).to.deep.equal(expected);
    });
  });
});
