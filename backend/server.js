const express = require("express");
const bodyParser = require("body-parser");
const { DatabaseHandler } = require("./databaseManager");
const app = express();
const port = 3000;
const jwt = require('njwt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const secretKey = "secret-phrase-for-encryption-and-decryption";


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
    const claims = { iss: "login-claim", sub: "user-login" };
    const token = jwt.create(claims, secretKey);
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
  let token = req.headers['authorization'].split(' ')[1];
  const { ingredient } = req.body;
  jwt.verify(token,secretKey,async (err,ver)=>{
    if(err){
      res.status(405).send({ans:'expired'});
    }else{
      await dbManager.addIngredient(token,ingredient);
      res.status(200).send({ans:'added'});
    }
  });

});

app.get("/ingredients",async (req,res)=>{
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection("Users");
  const token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token,secretKey,async (err,ver)=>{
    if(err){
      res.status(405).send({ans:'expired'});
    }else{
      res.send(await dbManager.getIngredients(token));
    }
  });
});

app.get("/ingredients/:id",async (req,res)=>{
  await dbManager.setUpConnection(dbName);
  await dbManager.setUpConnection('Users');
  const token = req.headers['authorization'].split(' ')[1];
  let {id} = req.params;
  jwet.verify(token,secretKey,async (err,ver)=>{
    if(err){
      res.status(405).send({ans:'expired'});
    }else{
      res.send(await dbManager.getIngredient(token,id-1));
    }
  });
})

app.put(`/ingredients/:id`,async (req,res)=>{
  let {id} = req.params();
  let token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token,secretKey,async (err,ver)=>{
    if(err){
      res.status(405).send({ans:'expired'});
    }else{
      await dbManager.updateIngredient(token,id,req.body);
      res.send({result:'updated'});
    }
  });
});

app.delete('/ingredients/:id',async (req,res)=>{
  let {id} = req.params;
  let token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token,secretKey,async (err,ver)=>{
    if(err){
      res.status(405).send({ans:'expired'});
    }else{
      await dbManager.deleteIngredient(token,id);
      res.send({result:'deleted'});
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
