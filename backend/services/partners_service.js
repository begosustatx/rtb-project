const axios = require('axios');
const str = require 
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
    console.log(url)
    // const response = await axios.post("https://www.klazify.com/api/categorize", url, { headers })
    //return response.data.domain.categories.map(elem => elem.name);
    return [
        '/Arts & Entertainment',
        '/Arts & Entertainment/Celebrities & Entertainment News',
      ]
};
async function addPartner(url) {
    const categories = await sendPost(url);
    await client.connect();
    var dbo = client.db(dbName);
    const ids =  await Promise.all(categories.map(async(cat) =>{
       const catObj =await dbo.collection("Categories").find({name: cat}).toArray()
       return catObj[0]._id;
    }));
    const newPartner = {
        url,
        categories: ids, 
    }
    await dbo.collection(colName).insertOne(newPartner);
    client.close();
}


module.exports = { addPartner };