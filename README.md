# Create Synthetic Data in Azure Cosmos DB

A simple Node.js application to generate synthetic data, and Azure Functions, deployed on Azure Function Apps to do CRUD operations to
a Cosmos DB container
## Requirements
- Node.js
- Azure Cosmos DB account

## Setup
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with your Cosmos DB `ENDPOINT` and `KEY`

## Usage
Run `node index.js` to generate the synthetic data and insert it into the Cosmos DB container.

