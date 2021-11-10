const express = require("express");

const app = express();


server.use((req, res, next) => {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Methods", "HEAD,OPTIONS,GET,POST,PUT,FETCH,DELETE");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization,strict-origin-when-cross-origin");
    next();
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/src/index.html");
});

app.get("/sobre-empresa", function(req, res){
    res.sendFile(__dirname + "/src/sobre-empresa.html");
});

app.get("/blog", function(req, res){
    res.send("Pagina do blog");
});

app.get("/contato", function(req, res){
    res.send("Pagina de contato");
});

//localhost:8080
app.listen(8080);