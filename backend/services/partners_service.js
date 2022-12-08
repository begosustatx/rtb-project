const axios = require('axios');
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://begosustatx:250297bst@cluster0.x1oy8rm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "Affiliate";
const colName = "Partners";

const headers = {
    'Accept': "application/json",
    "Content-Type": "application/json",
    'Authorization':
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzkzNWQwZmUzYWJhZWY3Mjk1NWE3MmE2OGQ5N2Y3MWE3NTA5M2RiMGQ1NGM3ZGNjYWRlMGRkNjUzYzkyYmEyMzBhZTlkZTM1NDc5OTA1YzgiLCJpYXQiOjE2NjYwODg3ODAsIm5iZiI6MTY2NjA4ODc4MCwiZXhwIjoxNjk3NjI0NzgwLCJzdWIiOiI4NDk4Iiwic2NvcGVzIjpbXX0.RLoOoeQy7UEdsAzJn1JCwCZ_0NZhpDuTrHBT6R6eAfDUtjkTioQRkK2azeOPs4A9KHtbj9sGYVzl6dsJrnuxPw"
  };
async function sendPost(url){
    const response = await axios.post("https://www.klazify.com/api/categorize", {url: url}, { headers })
    return response.data.domain.categories.map(elem => elem.name);
    /*return [
        '/Autos & Vehicles/Vehicle Shopping',
        '/Arts & Entertainment/Celebrities & Entertainment News',
    ]*/
};

async function getCategoriesId (categories){
    const objs =  await Promise.all(categories.map(async(cat) =>{
       return await client.db(dbName).collection("Categories").findOne({name: cat})
    }));
    const ids = objs.filter(obj => obj != null).map(obj => obj._id);
    console.log(ids)
    return ids;
}

async function getProductsId (catIds){
    const objs = await Promise.all(catIds.map(async(id) =>{
       return  await client.db(dbName).collection("Products").findOne({categories: id})
    }));
    return objs.filter(obj => obj !== undefined).map(obj => obj?._id);
}

async function addPartner(body) {
    const categories = await sendPost(body.url);
    const categories_ids = await getCategoriesId(categories)
    const products_ids = await  getProductsId(categories_ids)
    const newPartner = {
        url: body.url,
        categories: categories_ids,
        products: products_ids,
    }
    await client.db(dbName).collection(colName).insertOne(newPartner);
}
async function getPartners() {
    await client.connect();
    var dbo = client.db(dbName);
    return await dbo.collection(colName).find().toArray();
}

module.exports = { addPartner, getPartners };