const { MongoClient } =  require("mongodb");

const url = process.env.MONGOURL;

const database = 'MusicPlaylist';

const collection = 'playlist';



require('dotenv').config();



const client = new MongoClient(url);

async function connectdb(){

    let result = await client.connect();
  
    console.log(`Connected to MongoDB`.bgGreen);
    
    db =  result.db(database);

    return db.collection(collection);

}



module.exports = connectdb;