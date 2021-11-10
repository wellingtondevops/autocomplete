const express = require("express");
const Cors = require("cors")
const BodyParser = require("body-parser")

const app = express();
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))
app.use(Cors())
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