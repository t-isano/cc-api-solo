(() => {
  class Charamanager {
    async getBaseAPI() {
      const baseAPI = "http://localhost:5000/";
      return baseAPI;
    }

    async findNames() {
      let api = (await getBaseAPI()) + "characters";

      const res = await fetch(api);
      const charData = await res.json();
      console.log(charData);
      // const realNames = charData.results.map(char => char.realName);
      // console.log(realNames);

      return realNames;
    }

    // This should return an array of all the names of n Pokemon from the Pokemon API.
    async findNames(n) {
      // Your code here.
      const api = "https://pokeapi.co/api/v2/pokemon?limit=" + n;

      const res = await fetch(api);
      const pokeData = await res.json();
      const getNames = pokeData.results.map((poke) => poke.name);

      return getNames;
    }

    // This should return an array of all the Pokemon that are under a particular weight.

    async findUnderWeight(weight) {
      // Your code here.
      // ** LIMIT TO THE FIRST 10 POKEMON
      // We don't want to make too many unnecessary calls to the Pokemon API

      const limit = 10; // LIMIT TO THE FIRST 10 POKEMON
      const api = "https://pokeapi.co/api/v2/pokemon?limit=" + limit; // api with limit

      const unders = [];
      const pokeRes = await fetch(api);
      const pokeData = await pokeRes.json();
      const pokeApiInfo = pokeData.results;

      for (let info of pokeApiInfo) {
        const res = await fetch(info.url);
        const poke = await res.json();
        if (poke.weight < weight) unders.push(poke); // weight が基準値未満の場合は結果に追加
      }

      return unders;
    }
  }

  window.Charamanager = Charamanager;
})();
