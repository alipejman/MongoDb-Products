const ConnectToMongoDb = require('../utils/MongoDb-Connection');
const { ObjectId } = require('mongodb');
const ProductCollection = 'Products';

async function Read() {
  const db = await new ConnectToMongoDb().Get();
  if (!db) {
    throw new Error('Database connection is not established');
  }
  return new Promise(async (resolve, reject) => {
    const Products = await db
      .collection(ProductCollection)
      .find(
        {},
        {
          sort: { _id: -1 },
        }
      )
      .toArray();
    resolve(Products);
  });
}

async function FindById(id) {
  const db = await new ConnectToMongoDb().Get();
  return new Promise(async (resolve, reject) => {
    const Product = await db
      .collection(ProductCollection)
      .findOne({ _id: new ObjectId(id) });
    resolve(Product);
  });
}

async function Create(Product) {
  const db = await new ConnectToMongoDb().Get();
  return new Promise(async (resolve, reject) => {
    const Result = await db.collection(ProductCollection).insertOne(Product);
    resolve(Result);
  });
}

async function Update(id, payload) {
  const db = await new ConnectToMongoDb().Get();
  return new Promise(async (resolve, reject) => {
    const Result = await db.collection(ProductCollection).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...payload },
      }
    );
    resolve(Result);
  });
}

async function Remove(id) {
  const db = await new ConnectToMongoDb().Get();
  return new Promise(async (resolve, reject) => {
    const Result = await db
      .collection(ProductCollection)
      .deleteOne({ _id: new ObjectId(id) });
    resolve(Result);
  });
}

const ProductsModel = {
  Read,
  FindById,
  Create,
  Update,
  Remove,
};

module.exports = ProductsModel;
