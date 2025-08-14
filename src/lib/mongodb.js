import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbNameEnv = process.env.MONGODB_DB || 'prepverse';
const directConnection = process.env.MONGODB_DIRECT === 'true';
const allowInvalidCert = process.env.MONGODB_TLS_ALLOW_INVALID_CERTS === 'true';
const serverSelectionTimeoutMS = Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 15000);
if (!uri) {
  throw new Error('MONGODB_URI is not set');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      ignoreUndefined: true,
      directConnection,
      tlsAllowInvalidCertificates: allowInvalidCert,
      serverSelectionTimeoutMS,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    ignoreUndefined: true,
    directConnection,
    tlsAllowInvalidCertificates: allowInvalidCert,
    serverSelectionTimeoutMS,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export async function getDb() {
  const c = await clientPromise;
  return c.db(dbNameEnv);
}


