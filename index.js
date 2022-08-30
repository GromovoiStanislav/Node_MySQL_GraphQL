const express = require("express");
const path = require("path");
const app = express();
const sequelize = require("./utils/database");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.use((req, res, next) => {
  res.sendFile("/index.html");
});

async function start() {
  try {
    await sequelize.sync(); //{ force: true }
    app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start();
