const express = require("express");
const path = require("path");

const setupServer = () => {
  // delete require.cache[require.resolve("./data/pokemon.json")];
  // delete require.cache[require.resolve("./data/attacks.json")];
  // delete require.cache[require.resolve("./data/types.json")];
  // delete require.cache[require.resolve("./data/index.js")];
  // pokeData = require("./data");

  const app = express();

  // public ディレクトリを静的ホスト
  app.use(express.static(path.join(__dirname, "/public")));

  app.use(express.json()); // レスポンスをすべてJSON形式で返す

  // for debug api
  app.get("/hello", (req, res) => res.json("world!"));

  return app;
};

module.exports = { setupServer };
