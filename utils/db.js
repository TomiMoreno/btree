import { MongoClient } from 'mongodb';

export async function findOne(id = 1) {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.alkwu.mongodb.net/btree?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri);
  const database = await client.db('btree');
  const trees = await database.collection('trees');
  const query = { id };
  const dbTree = await trees.findOne(query);
  return dbTree;
}

export async function find() {
  return false;
}
