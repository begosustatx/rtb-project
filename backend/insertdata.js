const { MongoClient } = require("mongodb");
const categories = './categories.json'
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://begosustatx:250297bst@cluster0.x1oy8rm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "Affiliate";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("Categories");

        // Construct a document                                                                                                                                                              
        let categories = [
            {
                "name": "/Autos & Vehicles"
            },
            {
                "name": "/Beauty & Fitness"
            },
            {
                "name": "/Books & Literature"
            },
            {
                "name": "/Business & Industrial"
            },
            {
                "name": "/Computers & Electronics"
            },
            {
                "name": "/Food & Drink"
            },
            {
                "name": "/Games"
            },
            {
                "name": "/Health"
            },
            {
                "name": "/Home & Garden"
            },
            {
                "name": "/Internet & Telecom"
            },
            {
                "name": "/Jobs & Education"
            },
            {
                "name": "/Law & Government"
            },
            {
                "name": "/News"
            },
            {
                "name": "/Online Communities"
            },
            {
                "name": "/People & Society"
            },
            {
                "name": "/Pets & Animals"
            },
            {
                "name": "/Real Estate"
            },
            {
                "name": "/Reference"
            },
            {
                "name": "/Science"
            },
            {
                "name": "/Shopping"
            },
            {
                "name": "/Sports"
            },
            {
                "name": "/Travel"
            }
        ]

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
