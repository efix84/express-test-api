var { MongoClient, ObjectId } = require("mongodb");

var url = "mongodb://localhost:27017/";
const mongodb = MongoClient.connect(url, { useUnifiedTopology: true });

async function insertUser(json) {
  const db = await mongodb;
  await db.db("mydb").collection("usercollection").insertOne(json);
}

async function checkUser(email, password) {
  const db = await mongodb;
  result = await db.db("mydb").collection("usercollection").findOne({email, password});
  if(result){
    console.log(result)
    return {
      id: result._id,
      email: result.email,
      vorname: result.vorname,
      nachname: result.nachname,
    }
  }
  throw Error('Invalid credentials')
}

module.exports = {
    insertUser: insertUser,
    checkUser: checkUser
}