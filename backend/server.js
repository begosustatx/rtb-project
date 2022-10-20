const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require("./connect");
const app = express();

const corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.get("/test", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let categories = [
        {
            "name": "/TEEESE"
        },
    ];
    connect.insert(categories)
    res.send("heeello");
});
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, function () {
    console.log("Server started successfully");
});


