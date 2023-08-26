// import { config } from 'dotenv';
// config();

// import { CosmosClient } from "@azure/cosmos";

// const endpoint = process.env.COSMOS_ENDPOINT;
// const key = process.env.COSMOS_KEY;
// const client = new CosmosClient({ endpoint, key });

// async function main() {
//   // The rest of the README samples are designed to be pasted into this function body
//     const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
//     console.log(database.id);
// }

// main().catch((error) => {
//   console.error(error);
// });

const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
  try {
    const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
    context.res = {
      status: 200,
      body: `Database ${database.id} created successfully`
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: `Error: ${error.message}`
    };
  }
};

