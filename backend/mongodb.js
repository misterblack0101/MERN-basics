const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "e-comm";

async function dbConnect() {
  let result = await client.connect();
  let db = result.db(dbName);
  return db.collection("products");
  //   const resp = await collection.find({ name: "iqoo eo 6" }).toArray();
  //   console.log(resp);
}

const insert = async (insertData) => {
  const db = await dbConnect();
  const res = await db.insertOne(insertData);
  return res;
};

const update = async (updateData) => {
  let data = await dbConnect();
  let res = await data.update(
    {
      name: updateData.name,
    },
    {
      $set: updateData,
    }
  );
  return res;
};

const deleteData = async (name) => {
  let data = await dbConnect();
  return await data.deleteMany({ name: name });
};

const getData = async (findQuery) => {
  let db = await dbConnect();
  return await db.find(findQuery).toArray();
};
module.exports = { dbConnect, insert, update, deleteData, getData };
