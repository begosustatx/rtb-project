const { MongoClient } = require("mongodb");
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://begosustatx:250297bst@cluster0.x1oy8rm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "Affiliate";
const colName = "Products";
const catJson = require("../products.json")
const ObjectId = require('mongodb').ObjectId;

async function updatePartners(catIds, prod_id) {
    await client.connect();
    const partners = await Promise.all(catIds.map(async (cat_id) => {
        return await client.db(dbName).collection("Partners").findOne({ categories: new ObjectId(cat_id) })
    }));
    const partners_ids = partners.filter(item => item != null).map(item => item._id);
    partners_ids.map((async (id) => {
        await client.db(dbName).collection("Partners").updateOne({ _id: id },
            {
                $push: { products: prod_id }
            }
        )
    }))
}

async function getCategoriesID(categories) {
    await client.connect();
    const categoriesObj = await Promise.all(categories.map(async (category) => {
        console.log("category", category);
        return await client.db(dbName).collection("Categories").findOne({ name: category })
    }));
    console.log(categoriesObj);
    return categoriesObj.filter(item => item != null).map(item => item._id);
}

async function addProduct(body) {
    await client.connect();
    var dbo = client.db(dbName);
    const product = await dbo.collection(colName).insertOne(body);
    await updatePartners(await getCategoriesID(body.categories), product.insertedId)
}
async function addProducts() {
    await client.connect();
    catJson.forEach(elem => addProduct(elem))
}

async function getWidgetId(body) {
    await client.connect();
    let categoriesObj = null;
    if (body.topics.length > 0) {
        categoriesObj = await Promise.all(body.topics.map(async (topic) => {
            return await client.db(dbName).collection("Categories").findOne({ topics_id: parseInt(topic, 10) })
        }));
        categoriesObj = categoriesObj[0]
        console.log(categoriesObj)

        if (categoriesObj != null) {
            categoriesObj = await client.db(dbName).collection("Partners").findOne({ categories: categoriesObj._id });
        }
        console.log('categoriesObj', categoriesObj)
    }
    if (categoriesObj == null) {
        console.log('innnnt e this');
        categoriesObj = await client.db(dbName).collection("Partners").findOne({ url: body.url });
    }
    console.log('categoriesObj', categoriesObj);

    if (categoriesObj == null) {
        return;
    }
    const product = await client.db(dbName).collection("Products").findOne({ _id: categoriesObj.products[0] });

    return product.widget_id;
}

async function getProducts() {
    await client.connect();
    var dbo = client.db(dbName);
    return await dbo.collection(colName).find().toArray();
}

module.exports = { addProduct, getWidgetId, addProducts, getProducts };