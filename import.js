import fs from 'fs';
import { MongoClient, Decimal128 } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'pet_home';
const collectionName = 'products';

async function main() {
  let client;
  try {
    console.log('Reading products.json...');
    const productsData = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

    console.log(`Connecting to MongoDB at ${url}...`);
    client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log(`Clearing collection "${collectionName}"...`);
    await collection.deleteMany({});
    console.log('Collection cleared.');

    const now = new Date();
    const formattedProducts = productsData.map(p => {
      return {
        _class: 'com.petshop.model.Product',
        id: p.id,
        name: p.name,
        brand: p.brand,
        price: Decimal128.fromString(p.price.toString()),
        oldPrice: p.oldPrice ? Decimal128.fromString(p.oldPrice.toString()) : null,
        discount: p.discount,
        hot: p.hot,
        rating: p.rating,
        reviews: p.reviews,
        emoji: p.emoji,
        imageUrl: p.imageUrl || null,
        category: p.category,
        sections: p.sections,
        stock: p.stock,
        createdAt: now,
        updatedAt: now
      };
    });

    console.log(`Inserting ${formattedProducts.length} products...`);
    const result = await collection.insertMany(formattedProducts);
    console.log(`Successfully imported ${result.insertedCount} products into database "${dbName}"!`);

  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

main();
