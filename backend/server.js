const express = require("express");
const bodyParser = require("body-parser");
const { DatabaseHandler } = require("./databaseManager");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbName = 'RecipesDB';

//this block will be deleted in further iterations
const dbManager = DatabaseHandler();

app.get("/recipes/all",async (req,res)=>{
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection('Recipes');
  let response = await dbManager.queryAll({});
  res.send(response.map(recipe => {
    let {_id,...recipeView} = recipe;
    return recipeView;
  }));
});

app.get("/recipes/recipe", async (req,res)=>{
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection('Recipes');
  let uriString = req.query.ingredients.split(';');
  let reqObject = {};
  for(let i = 0 ; i < Object.keys(req.query).length; i++){
    if(Object.keys(req.query)[i] !== 'ingredients'){
      reqObject[Object.keys(req.query)[i].trim()] = req.query[Object.keys(req.query)[i]];
    }
  }
  let request = {ingredients:uriString.map(ingredient => ingredient.trim())};
  console.log(reqObject, request)
  let response = await dbManager.recipesQueryBy(reqObject,request);
  res.send(response.map(recipe => {
    let {_id,...recipeView} = recipe;
    return recipeView;
  }));
});


app.post('/recipes/add',async (req,res)=>{
  await dbManager.setUpConnection(dbName);
  await dbManager.setCollection('Recipes');
  req.body.ingredients.sort();
  let response = await dbManager.insertObject(req.body);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
