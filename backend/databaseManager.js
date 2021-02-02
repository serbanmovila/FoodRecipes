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
            return await collection.insertOne(toInsert) ? {status:"Recipe inserted!"} : {status:"Recipe was not inserted!"};
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
        }
    }
}
