
const { CosmosClient } = require("@azure/cosmos");
// Configure COSMOS_ENDPOINT and COSMOS_KEY in the function app configuration page
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

