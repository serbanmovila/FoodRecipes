const express = require("express");
const bodyParser = require("body-parser");
const { DatabaseHandler } = require("./databaseManager");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbName = "RecipesDB";

//this block will be deleted in further iterations
const dbManager = DatabaseHandler();

app.get("/recipes/all", async (req, res) => {
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection("Recipes");
  let response = await dbManager.queryAll({});
  res.send(
    response.map((recipe) => {
      let { _id, ...recipeView } = recipe;
      return recipeView;
    })
  );
});

app.get("/recipes/recipe", async (req, res) => {
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection("Recipes");
  let uriString = req.query.ingredients.split(";");
  let reqObject = {};
  for (let i = 0; i < Object.keys(req.query).length; i++) {
    if (Object.keys(req.query)[i] !== "ingredients") {
      reqObject[Object.keys(req.query)[i].trim()] =
        req.query[Object.keys(req.query)[i]];
    }
  }
  let request = {
    ingredients: uriString.map((ingredient) => ingredient.trim()),
  };
  console.log(reqObject, request);
  let response = await dbManager.recipesQueryBy(reqObject, request);
  res.send(
    response.map((recipe) => {
      let { _id, ...recipeView } = recipe;
      return recipeView;
    })
  );
});

app.post("/recipes/add", async (req, res) => {
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection("Recipes");
  req.body.ingredients.sort();
  let response = await dbManager.insertObject(req.body);
  res.send(response);
});

app.post("/register", async (req, res) => {
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection("Users");
  let data = req.body;
  data.ingredients = [];
  res.send(await dbManager.insertObject(data));
  // res.send("All good!");
});

app.post("/login", async (req, res) => {
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection("Users");
  let usr = req.body.username;
  let psd = req.body.password;
  if ((await dbManager.checkIfUserExist(usr,psd)) === true) {
    const jwt = require("njwt");
    const claims = { iss: "login-claim", sub: "user-login" };
    const token = jwt.create(claims, psd);
    token.setExpiration(new Date().getTime() + 60 * 1000);
    let jwtToken = token.compact();
    await dbManager.updateAt({username:usr,password:psd},{token:jwtToken});
    res.send({token:jwtToken});
  }
  else{
    res.status(404).send('User not found!');
  }
});

app.post("/ingredients/add", async (req, res) => {
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection("Users");
  const jwt = require('njwt');
  const { token,password,ingredient } = req.body;
  jwt.verify(token,password,async (err,ver)=>{
    if(err){
      res.status(405).send({ans:'expired'});
    }else{
      await dbManager.addIngredient(token,ingredient);
      res.status(200).send({ans:'added'});
    }
  });

});

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
