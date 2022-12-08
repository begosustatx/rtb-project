const { MongoClient } = require("mongodb");
const catJson = require("../categories.json")
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://begosustatx:250297bst@cluster0.x1oy8rm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "Affiliate";
const colName = "Categories";

async function getCategories() {
    await client.connect();
    var dbo = client.db(dbName);
    const categories = await dbo.collection(colName).find().toArray();
    return categories;
}

async function addCategories() {
    await client.connect();
    //console.log("on addCategories");
    var dbo = client.db(dbName);
    const categories = await dbo.collection(colName).insertMany(catJson);
    console.log(categories);
}

module.exports = { getCategories, addCategories };