const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://begosustatx:250297bst@cluster0.x1oy8rm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "Affiliate";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
async function insert(categories) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("Categories");

        // Construct a document                                                                                                                                                              


        // Insert a single document, wait for promise so we can read it back
        await col.insertMany(categories);
        // Find one document
        // const myDoc = await col.find();
        // Print to the console
        // console.log(myDoc);



    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);
module.exports = { run, insert };
