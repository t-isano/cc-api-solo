const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const pokeData = require("../src/data");

chai.should();
/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */

const newPokemon = {
  id: "152",
  name: "MewThree",
  classification: "New Species Pokémon",
  types: ["Psychic"],
  resistant: ["Fighting", "Psychic"],
  weaknesses: ["Bug", "Ghost", "Dark"],
  weight: {
    minimum: "3.5kg",
    maximum: "4.5kg",
  },
  height: {
    minimum: "0.35m",
    maximum: "0.45m",
  },
  fleeRate: 0.1,
  "Pokémon Class": "This is a MYTHIC Pokémon.",
  MYTHIC: "Pokémon Class",
  maxCP: 3087,
  maxHP: 3299,
  attacks: {
    fast: [
      {
        name: "Pound",
        type: "Normal",
        damage: 7,
      },
    ],
    special: [
      {
        name: "Dragon Pulse",
        type: "Dragon",
        damage: 65,
      },
      {
        name: "Earthquake",
        type: "Ground",
        damage: 100,
      },
      {
        name: "Fire Blast",
        type: "Fire",
        damage: 100,
      },
      {
        name: "Hurricane",
        type: "Flying",
        damage: 80,
      },
      {
        name: "Hyper Beam",
        type: "Normal",
        damage: 120,
      },
      {
        name: "Moonblast",
        type: "Fairy",
        damage: 85,
      },
      {
        name: "Psychic",
        type: "Psychic",
        damage: 55,
      },
      {
        name: "Solar Beam",
        type: "Grass",
        damage: 120,
      },
      {
        name: "Thunder",
        type: "Electric",
        damage: 100,
      },
    ],
  },
};

describe("Pokemon API Server", () => {
  let request;
  let server;
  beforeEach(() => {
    delete require.cache[require.resolve("../src/server")];
    const { setupServer } = require("../src/server");
    server = setupServer();
    request = chai.request(server).keepOpen();
  });

  afterEach(() => {
    request.close();
  });

  it("should be GET /api/pokemon", async () => {
    // Setup and Exercise
    const res = await request.get("/api/pokemon");
    const res2 = await request.get("/api/pokemon?limit=10");
    // Assertion
    res.should.have.status(200);
    res2.should.have.status(200);
    res.should.be.json;
    res2.should.be.json;
    JSON.parse(res.text).should.deep.equal(pokeData.pokemon);
    JSON.parse(res2.text).length.should.equal(10);
    JSON.parse(res2.text).should.deep.equal(pokeData.pokemon.slice(0, 10));
  });

  it("should be POST /api/pokemon", async () => {
    // Setup and Exercise
    const res = await request.post("/api/pokemon").send(newPokemon);
    const res2 = await request.get("/api/pokemon/152");
    // Assertion
    res.should.have.status(201);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(newPokemon);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(newPokemon);
  });

  it("should be GET /api/pokemon/:id", async () => {
    // Setup and Exercise
    const res = await request.get("/api/pokemon/042");
    const res2 = await request.get("/api/pokemon/42");
    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).id.should.equal("042");
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).id.should.equal("042");
  });

  it("should be GET /api/pokemon/:name", async () => {
    // Setup and Exercise
    const res = await request.get("/api/pokemon/Machamp");
    const res2 = await request.get("/api/pokemon/machamp"); // case no sensitive
    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).id.should.equal("068");
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).id.should.equal("068");
  });

  it("should be PATCH /api/pokemon/:idOrName", async () => {
    // Setup and Exercise
    const res = await request.patch("/api/pokemon/042").send({
      maxCP: 2500,
      maxHP: 2600,
    });
    const res2 = await request.get("/api/pokemon/042");
    const res3 = await request.patch("/api/pokemon/machamp").send({
      maxCP: 2500,
      maxHP: 2600,
    });
    const res4 = await request.get("/api/pokemon/machamp");
    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).id.should.equal("042");
    JSON.parse(res.text).maxCP.should.equal(2500);
    JSON.parse(res.text).maxHP.should.equal(2600);

    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).id.should.equal("042");
    JSON.parse(res2.text).maxCP.should.equal(2500);
    JSON.parse(res2.text).maxHP.should.equal(2600);

    res3.should.have.status(200);
    res3.should.be.json;
    JSON.parse(res3.text).id.should.equal("068");
    JSON.parse(res3.text).maxCP.should.equal(2500);
    JSON.parse(res3.text).maxHP.should.equal(2600);

    res4.should.have.status(200);
    res4.should.be.json;
    JSON.parse(res4.text).id.should.equal("068");
    JSON.parse(res4.text).maxCP.should.equal(2500);
    JSON.parse(res4.text).maxHP.should.equal(2600);
  });

  it("should be DELETE /api/pokemon/:idOrName", async () => {
    // Setup and Exercise
    const res = await request.delete("/api/pokemon/042");
    const res2 = await request.get("/api/pokemon/042");
    const res3 = await request.delete("/api/pokemon/machamp");
    const res4 = await request.get("/api/pokemon/machamp");
    // Assertion
    res.should.have.status(204);
    res2.should.have.status(404);
    res3.should.have.status(204);
    res4.should.have.status(404);
  });

  it("should be GET /api/pokemon/:idOrName/evolutions", async () => {
    // Setup and Exercise
    const res = await request.get("/api/pokemon/staryu/evolutions");
    const res2 = await request.get("/api/pokemon/Mew/evolutions");

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal([{ id: 121, name: "Starmie" }]);

    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal([]);
  });

  // previous exist pattern
  it("should be GET /api/pokemon/:idOrName/evolutions/previous", async () => {
    // Setup and Exercise
    const res = await request.get("/api/pokemon/17/evolutions/previous");
    const res2 = await request.get("/api/pokemon/Mew/evolutions/previous");

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal([{ id: 16, name: "Pidgey" }]);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal([]);
  });

  // all types
  it("should be GET /api/types", async () => {
    // Setup and Exercise
    const res = await request.get("/api/types");
    const res2 = await request.get("/api/types?limit=10");
    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(pokeData.types);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(pokeData.types.slice(0, 10));
  });

  it("should be POST /api/types", async () => {
    // Setup and Exercise
    const res = await request.post("/api/types").send({ type: "NewType" });
    const res2 = await request.get("/api/types");

    // Assertion
    res.should.have.status(201);
    res.should.be.html;
    res.text.should.equal("NewType");
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).slice(-1)[0].should.equal("NewType");
  });

  it("should be DELETE /api/types/:name", async () => {
    // Setup and Exercise
    const res = await request.delete("/api/types/Grass");
    const res2 = await request.get("/api/types");

    // Assertion
    res.should.have.status(204);
    res2.should.be.json;
    JSON.parse(res2.text).length.should.equal(16);
  });

  it("should be GET /api/types/:type/pokemon", async () => {
    // Setup and Exercise
    const res = await request.get("/api/types/Grass/pokemon");
    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).length.should.be.least(1);
  });

  // get all attacks
  it("should be GET /api/attacks", async () => {
    // Setup and Exercise
    const res = await request.get("/api/attacks");
    const res2 = await request.get("/api/attacks?limit=5");

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(
      pokeData.attacks.fast.concat(pokeData.attacks.special)
    );
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(
      pokeData.attacks.fast.concat(pokeData.attacks.special).slice(0, 5)
    );
  });

  // get all attacks
  it("should be GET /api/attacks/fast", async () => {
    // Setup and Exercise
    const res = await request.get("/api/attacks/fast");
    const res2 = await request.get("/api/attacks/fast?limit=5");

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(pokeData.attacks.fast);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(pokeData.attacks.fast.slice(0, 5));
  });

  // get all attacks
  it("should be GET /api/attacks/special", async () => {
    // Setup and Exercise
    const res = await request.get("/api/attacks/special");
    const res2 = await request.get("/api/attacks/special?limit=5");

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(pokeData.attacks.special);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(
      pokeData.attacks.special.slice(0, 5)
    );
  });

  // get all attacks
  it("should be GET /api/attacks/:name (case fast)", async () => {
    // Setup and Exercise
    const res = await request.get("/api/attacks/Scratch");
    const res2 = await request.get("/api/attacks/Dragon Claw");

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      name: "Scratch",
      type: "Normal",
      damage: 6,
    });
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal({
      name: "Dragon Claw",
      type: "Dragon",
      damage: 35,
    });
  });

  it("should be GET /api/attacks/:name/pokemon (case fast)", async () => {
    // Setup and Exercise
    const res = await request.get("/api/attacks/Scratch/pokemon");
    const res2 = await request.get("/api/attacks/Dragon Claw/pokemon");

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).length.should.be.least(1);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).length.should.be.least(1);
  });

  it("should be POST /api/attacks/fast", async () => {
    // Setup and Exercise
    const newAttack = { name: "NewFast", type: "Dragon", damage: 100 };
    const res = await request.post("/api/attacks/fast").send(newAttack);
    // Assertion
    res.should.have.status(201);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(newAttack);
  });

  it("should be POST /api/attacks/special", async () => {
    // Setup and Exercise
    const newAttack = { name: "NewSpecial", type: "Dragon", damage: 100 };
    const res = await request.post("/api/attacks/special").send(newAttack);

    // Assertion
    res.should.have.status(201);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(newAttack);
  });

  it("should be PATCH /api/attacks/:name", async () => {
    // Setup and Exercise
    const patchAttack = { name: "PatchFast", type: "Dragon", damage: 100 };
    const patchAttack2 = { name: "PatchSpecial", type: "Dragon", damage: 100 };

    const res = await request
      .patch("/api/attacks/Wing Attack")
      .send(patchAttack);
    const res2 = await request.patch("/api/attacks/Swift").send(patchAttack2);

    // Assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(patchAttack);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(patchAttack2);
  });

  it("should be DELETE /api/attacks/:name (fast case)", async () => {
    // Setup and Exercise
    const res = await request.delete("/api/attacks/Frost Breath");
    const res2 = await request.delete("/api/attacks/Solar Beam");

    // Assertion
    res.should.have.status(204);
    res2.should.have.status(204);
  });
});
