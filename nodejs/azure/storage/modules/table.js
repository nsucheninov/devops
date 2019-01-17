'use strict'
const storage = require('azure-storage');

const createTable = async (tableService, tableName) => {
    return new Promise((resolve, reject) => {
        tableService.createTableIfNotExists(tableName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Table '${tableName}' ${data.created ? "created" : "exists"}.`, created: data.created });
            }
        });
    });
};

const insertOrMergeEntity = async (tableService, tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableService.insertOrMergeEntity(tableName, entity, (error, result, response) => {
            if (error) {
                reject(error);
            } else {
                resolve({ message: `Entity inserted`, result, response })
            }
        });
    });
};

const retrieveEntity = async (tableService, tableName, partitionKey, rowKey) => {
    return new Promise((resolve, reject) => {
        tableService.retrieveEntity(tableName, partitionKey, rowKey, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({ message: `Entity retrived`, result })
            }
        });
    });
};

const queryEntitiesAll = async (tableService, tableName) => {

    var storageTableQuery  = storage.TableQuery;
    var segmentSize = 1;
    var tableQuery = new storageTableQuery ()
        .top(segmentSize);

    var continuationToken = null;
    var records = [];

    do {
        var result = await queryEntitiesSegment(tableService, tableName, tableQuery, continuationToken);
        records = records.concat(result.entries);
        continuationToken = result.continuationToken;

    }while(continuationToken);

    return records;
};

const queryEntities = async function (tableService, tableName, tableQuery, continuationToken = null) {

    const segment = await queryEntitiesSegment(tableService, tableName, tableQuery, continuationToken);

    continuationToken = segment.result.continuationToken;

    if (continuationToken) {

        var response = await queryEntities(tableService, tableName, tableQuery, continuationToken);

        return segment.entities.concat(response);

    } else {
        return segment.entities;
    }
};

const queryEntitiesSegment = async (tableService, tableName, tableQuery, continuationToken) => {
    return new Promise((resolve, reject) => {
        tableService.queryEntities(tableName, tableQuery, continuationToken, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    create: createTable,
    insert: insertOrMergeEntity,
    retrieve: retrieveEntity,
    queryAll: queryEntitiesAll,
    query: queryEntities
};
