var { MongoClient, ObjectId } = require("mongodb");

var url = "mongodb://localhost:27017/";
const mongodb = MongoClient.connect(url, { useUnifiedTopology: true });

async function insertItem(json) {
  const db = await mongodb;
  await db.db("mydb").collection("testcollection").insertOne(json);
}

async function getItems() {
  const db = await mongodb;
  const items = await db
    .db("mydb")
    .collection("testcollection")
    .find()
    .toArray();
  return items;
}

async function deleteItem(_id) {
  console.log({ _id });
  const db = await mongodb;
  const result = await db
    .db("mydb")
    .collection("testcollection")
    .deleteOne({ _id: ObjectId(_id) });
  return result.deletedCount;
}

async function updateItem(_id, newobj) {
  console.log("to update", _id, newobj);
  const db = await mongodb;
  const result = await db
    .db("mydb")
    .collection("testcollection")
    .updateOne({ _id: ObjectId(_id) }, { $set: newobj });
  return result.modifiedCount
}

module.exports = {
  insertItem: insertItem,
  getItems: getItems,
  deleteItem: deleteItem,
  updateItem: updateItem,
};
