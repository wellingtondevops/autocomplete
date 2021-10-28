const {MongoClient }= require("mongodb")
const Express= require("express")
const Cors = require("cors")
const BodyParser = require("body-parser")
const { request, response } = require("express")

const client = new MongoClient("mongodb+srv://earchiveTester:cdh0tAYUFJXDMB3t@cluster0.rr6sx.mongodb.net/earchive?retryWrites=true&w=majority" )


const server = Express()

server.use(BodyParser.json())
server.use(BodyParser.urlencoded({extended:true}))
server.use(Cors())

var collection

server.get("/search",async(request,response)=>{
    try {
      
        
    } catch (e) {
        response.status(500).send({message: e.message})
    }
})

server.listen("3006", async()=>{
    try {
        await client.connect()
        collection= client.db("earchive").collection("recipes")
    } catch (e) {
        console.log(e)        
    }
})