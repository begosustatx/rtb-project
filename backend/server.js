const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const categories_services = require("./services/categories_services");
const partner_services = require("./services/partners_service");
const product_services = require("./services/product_service");
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.get("/categories", async function (req, res) {
    const categories = await categories_services.getCategories();
    res.send(categories)
});
app.post("/partner", async function (req, res) {
    await partner_services.addPartner(req.body);
    res.send(req.body);
});

app.post("/product", async function (req, res) {
    await product_services.addProduct(req.body);
    res.send(req.body);
});
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, function () {
    console.log("Server started successfully");
});


