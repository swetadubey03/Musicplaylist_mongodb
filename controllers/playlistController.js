const asyncHanlder = require ("express-async-handler")
const { MongoClient } = require('mongodb');
const connectdb = require("../config/db")


const uri = "mongodb+srv://playlist:qwerty12@cluster0.3bckfoa.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

function closeChangeStream(timeInMs = 60000, changeStream) {
    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Closing the change stream");

            changeStream.close();

            resolve();

        }, timeInMs)

    })

};

const createPlaylist = asyncHanlder(async(req,res)=>{
    
    let data = await connectdb();
//  const  pipeline = [{
    //     '$match':{
    //         "genre": "pop"
    //     },
    //     '$merge':{
    //         "into":"popSongs"
    //     }
        

    // }]

    const changeStream = data.watch();

    changeStream.on('change', (next) =>{

        console.log(next);

        // res.send({operationPerformed: next.operationType, clusterTime: next.clusterTime});

    });





    //Name of collection and database
    const database = client.db("MusicPlaylist")
    const playlist = database.collection("playlist")



    const {song,pop} = req.body


    //Details are missing
    if(!song ) {
        res.status(400)
        throw new Error("Details are missing")
        
        
    }

    //Create song
    
    const result = await playlist.insertOne(req.body)
    // console.log(`A document has been inserted with the _id: ${result.insertedId}`)


    if(result){
        res.status(201).json({
           message: "Playlist has been added",
           song,
           pop
        })
    }else{
        res.status(400)
        throw new Error("Something went wrong")
    }
    
    await closeChangeStream(timeInMs = 60000, changeStream);



})

// const listPlaylist = asyncHanlder(async(req,res)=>{

// })


module.exports = {createPlaylist}