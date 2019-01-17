if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const path = require('path');
const storage = require('azure-storage');
const blob = require('./modules/blob');
const table = require('./modules/table');

const blobService = storage.createBlobService();
const tableService = storage.createTableService();
const entityGen = storage.TableUtilities.entityGenerator;

const execute = async () => {

    const containerName = "demo";
    const tableName = "people";
    const blobName = "quickstart.txt";
    const content = "hello Blob SDK";
    const localFilePath = "./readme.md";
    let response;

    function newEntity(PartitionKey, RowKey, firstName, lastName, age, sport) {
        var entity = {
            PartitionKey: entityGen.String(PartitionKey),
            RowKey: entityGen.String(RowKey),
            firstName: entityGen.String(firstName),
            lastName: entityGen.String(lastName),
            age: entityGen.Int32(age),
            sport: entityGen.String(sport),
        };
        return entity;
    };

/*   
    console.log("Containers:");

    response = await blob.listContainers(blobService);

    response.containers.forEach((container) => console.log(` -  ${container.name}`));

    const containerDoesNotExist = response.containers.findIndex((container) => container.name === containerName) === -1;

    if (containerDoesNotExist) {
        response = await blob.createContainer(blobService, containerName);
        console.log(response.message);

        if (response.created) {
            console.log(`Container "${containerName}" is created. `);
        }
    }

    console.log("Table:");

    response = await table.create(tableService, tableName);

    console.log(response.message)

    var entity = newEntity("middleschoolstudents", "237548902", "Susan", "Meyer", 12, "Tennis");
    var entity = newEntity("middleschoolstudents", "237548903", "Susan2", "Meyer2", 13, "Tennis");


    response = await table.insert(tableService, tableName, entity);
    console.log(response.message)

    response = await table.retrieve(tableService, tableName, entity.PartitionKey._, entity.RowKey._);

    console.log(response.result.lastName._)
    */

    var records = await table.queryAll(tableService, tableName);

//    var entities = response.result.entities;

    records.forEach((record) => {
      console.log("  Student: %s,%s,%s,%s,%s,%s", record.PartitionKey._, record.RowKey._, record.firstName._, record.lastName._, record.age._, record.sport._)
    });    
}

execute().then(() => console.log("Done")).catch((e) => console.log(e));