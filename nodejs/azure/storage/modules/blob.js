'use strict'
const storage = require('azure-storage');

const listContainers = async (blobService) => {
    return new Promise((resolve, reject) => {
        blobService.listContainersSegmented(null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} containers`, containers: data.entries });
            }
        });
    });
};

const createContainer = async (blobService, containerName) => {
    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(containerName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Container '${containerName}' ${data.created ? "created" : "exists"}.`, created: data.created });
            }
        });
    });
};

module.exports = {
    listContainers: listContainers,
    createContainer: createContainer
};