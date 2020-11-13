exports.seed = function (knex) {
  // const departments = [
  //   {
  //     name: "admin",
  //   },
  //   {
  //     name: "user",
  //   },
  // ];

  return knex("users")
    .insert([
      { username: "pikachu", password: "haha123", department: "electric" },
      { username: "eevee", password: "rawr123", department: "normal" },
      { username: "raichu", password: "zapp123", department: "electric" },
    ])
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
