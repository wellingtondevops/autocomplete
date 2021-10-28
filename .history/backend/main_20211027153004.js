const {MongoCliente }= require("mongodb")
const Express= require("express")
const Cors = require("cors")
const BodyParser = require("body-parser")

const cliente = new MongoCliente( "mongodb://earchiveTester:cdh0tAYUFJXDMB3t@cluster0-shard-00-00-rr6sx.mongodb.net:27017/earchive?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin" )

