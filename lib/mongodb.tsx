import { MongoClient, ServerApiVersion } from 'mongodb';

// Extend the globalThis type to include _mongoClientPromise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Ensure the environment variable exists
if (!process.env.MongoURL) {
  throw new Error('Missing MongoURL environment variable.');
}

const uri: string = process.env.MongoURL;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Check if there's an existing global client promise to prevent multiple connections
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  
  // Connect to the database
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// Log if the connection is successful
clientPromise
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

export default clientPromise;
