const {MongoClient,ObjectId }= require("mongodb")
const Express= require("express")
const Cors = require("cors")
const BodyParser = require("body-parser")
const { request, response } = require("express")
const client = new MongoClient("mongodb+srv://earchiveTester:cdh0tAYUFJXDMB3t@cluster0.rr6sx.mongodb.net/earchive?retryWrites=true&w=majority" )


const server = Express()

server.use(BodyParser.json())
server.use(BodyParser.urlencoded({extended:true}))
server.use((request, response, next) => {
    request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Methods", "HEAD,OPTIONS,GET,POST,PUT,FETCH,DELETE");
    request.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    next();
});

var collection

server.get("/search",async(request,response)=>{



//  let text2 = '"' + request.query.term.split(" ").join('" "') + '"' || ""

    var term = request.query.term
    var replaceList = {
        1: "one ",
        2: "two ",
        3: "three ",
        4: "four ",
        5: "five ",
        6: "six ",
        7: "seven ",
        8: "eight ",
        9: "nine ",
        0: "zero "
    };
    let listChange = term.replace(/0|1|2|3|4|5|6|7|8|9/gi, function (item) {
        let it = replaceList[item];
        let itemLista = it.replace(/(?:^|\s)\S/g, function (elemento) { return elemento });
        return itemLista;
    });



let text2 = '"' +listChange.split(" ").join('" "') + '"' || ""
//   console.log(text2)
console.log(request.query.doc)

    try {
      let result = await collection.aggregate([
        { $match: { doct: ObjectId(request.query.doc) } },
          {
              "$search":{
                  "autocomplete":{
                      "query":`${text2}`,
                      "path":"fieldSearch",
                      "fuzzy":{
                          "maxEdits":1
                      }
                  }
              }
          },
          {
            $project: {
                fieldSearch: 1,
                fieldColumns: 1,
              score: { $meta: "searchScore" }
            }
          },
          
          { $limit : 10 }
      ])
      .toArray()
      
      response.send(result)

      
        
    } catch (e) {
        response.status(500).send({message: e.message})
    }
})

server.get("/get/:id", async(request,response)=>{    
    try {
        let result = await collection.findOne({"_id":ObjectId(request.params.id)})      
        response.send(result)  

    } catch (error) {
        response.status(500).send({message: e.message})
        
    }
})

server.listen("3006", async()=>{
    try {
        await client.connect()
        collection= client.db("earchive").collection("worksheets")
        
    } catch (e) {
        console.log(e)        
    }
})