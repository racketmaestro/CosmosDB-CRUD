require('dotenv').config();

const { CosmosClient } = require("@azure/cosmos");
const { v4: uuidv4 } = require('uuid');
// Configure ENDPOINT and KEY in a dotenv
const endpoint = process.env.ENDPOINT;
const key = process.env.KEY;

const client = new CosmosClient({ endpoint, key });
const databaseId = "Addenbrooke's Hospital";
const containerId = "Synthetic Data";

const deviceIds = Array.from({ length: 5 }, () => uuidv4());
const units = [
    { name: 'Ward A', floor: 0 },
    { name: 'Ward B', floor: 0 },
    { name: 'Ward C', floor: 1 },
    { name: 'Ward D', floor: 1 },
    { name: 'Doctors Office', floor: 0 },
    { name: 'Outpatients', floor: 1 },
    { name: 'Pharmacy', floor: 0 },
    { name: 'Cafe', floor: 1 },
  ];    
  
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function generateDeviceData(deviceId) {
    const startTime = new Date('2023-08-28T09:00:00.000Z');
    const endTime = new Date('2023-08-28T17:00:00.000Z');
    const timeIntervalMinutes = 10;
    const data = [];

    for (let currentTime = new Date(startTime); currentTime <= endTime; currentTime.setMinutes(currentTime.getMinutes() + timeIntervalMinutes)) {
        const randomUnit = units[getRandomInt(units.length)];
        data.push({
        device_id: deviceId,
        timestamp: currentTime.toISOString(),
        currentFloorLevel: randomUnit.floor,
        currentUnitName: randomUnit.name,
        });
    }

    return data;
}


async function createSyntheticData() {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
  
    for (const deviceId of deviceIds) {
      const deviceData = generateDeviceData(deviceId);
      for (const documentDefinition of deviceData) {
        await container.items.create(documentDefinition);
        console.log('Document created with device_id: ', documentDefinition.device_id, ' and timestamp: ', documentDefinition.timestamp);
      }
    }
  }
  
createSyntheticData().catch((error) => {
  console.error(error);
});