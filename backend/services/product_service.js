const { MongoClient } = require("mongodb");
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://begosustatx:250297bst@cluster0.x1oy8rm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "Affiliate";
const colName = "Products";
const ObjectId = require('mongodb').ObjectId; 

async function updatePartners(catIds, prod_id){
    await client.connect();
    const partners = await Promise.all(catIds.map(async(cat_id) =>{
        return await client.db(dbName).collection("Partners").findOne({categories: new ObjectId(cat_id)})
    }));
    const partners_ids = partners.filter(item => item != null).map(item => item._id)
    partners_ids.map((async(id) =>{
        await client.db(dbName).collection("Partners").updateOne({_id:id},
            {
                $push: { products: prod_id}
            }
        )
        }))
}

async function addProduct(body) {
    await client.connect();
    var dbo = client.db(dbName);
    const product = await dbo.collection(colName).insertOne(body);
    await updatePartners(body.categories, product.insertedId)
}

module.exports = { addProduct };