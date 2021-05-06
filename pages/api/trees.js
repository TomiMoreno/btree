// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb';

export default async (req, res) => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.alkwu.mongodb.net/btree?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri);
  const database = await client.db('btree');
  const trees = await database.collection('trees');

  const query = { };
  const tree = await trees.findOne(query);
  res.status(200).json({ tree });
};
