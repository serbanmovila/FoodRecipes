const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });


exports.DatabaseHandler = ()=>{
    let db = undefined;
    let collection = undefined;

    return {

        setUpConnection:async(databaseName)=>{
            await client.connect();
            db = await client.db(databaseName);
        },

        setCollection:async (collectionName)=>{
            collection = await db.collection(collectionName);
        },

        insertObject:async (toInsert)=>{
            return await collection.insertOne(toInsert) ? {status:"Element inserted!"} : {status:"Element was not inserted!"};
        },

        insertArray:async (toInsert)=>{
            return await collection.insertMany(toInsert) ? {status:"Recipes inserted!"} : {status:"Recipes were not inserted!"};
        },

        closeDb:async ()=>{
            await await client.close();
        },

        query:async (obj)=>{
            return collection.findOne(obj);
        },

        recipesQueryBy:async (reqObj,obj)=>{
            let data = await collection.find(reqObj).toArray();
            console.log(data)
            let result = [];
            for(let i of data){
                let nr = 0;
                for(let j of obj.ingredients){
                    if(i.ingredients.includes(j)){
                        nr++;
                    }
                }
                if(nr > 0){
                    result.push(i);
                }
            }
            return result;
        },

        queryAll:async (obj)=>{
            return await collection.find(obj).toArray();
        },

        remove:async (obj)=>{
            return (await collection.deleteOne(obj)).result;
        },

        removeAll:async (obj)=>{
            return (await collection.deleteMany(obj)).result;
        },
        
        updateAt:async (where,upFields)=>{
            return (await collection.updateOne(where,{$set:upFields})).result;
        },

        checkIfUserExist:async (userName,passWord) => {
            let users = await collection.find().toArray();
            for(let user of users){
                if(user.username.trim() === userName.trim() && user.password.trim() === passWord.trim()){
                    return true;
                }
            }
            return false;
        },

        addIngredient:async (token,ingredient) => {
            let user = await collection.findOne({token:token});
            let ingredients = user.ingredients;
            ingredients.push(ingredient);
            console.log(ingredients);
            await collection.updateOne({token:token},{$set:{ingredients:ingredients}});
        }
    }
}
