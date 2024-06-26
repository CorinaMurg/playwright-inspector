const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const date = require('../helpers/date');
const folderName = require('./folderName');

async function writeToCSV(timestamps, describeTimestampTitle) {
    const timestampsWithOrderCheck = timestamps.map((timestamp, index) => {
        let isDescending = '-'
        if (index > 0) {
            isDescending = timestamp <= timestamps[index - 1] ? 'true' : 'false';
        }
        return { timestamp, isDescending };
    });

    const csvWriter = createCsvWriter({
        path: `${folderName}/${date}.csv`,
        header: [
            { id: 'timestamp', title: `Timestamp*` },
            { id: 'isDescending', title: `Is Descending?` },
            { id: 'description', title: `*${describeTimestampTitle}` }
        ],
    });

    await csvWriter.writeRecords(timestampsWithOrderCheck);
}

module.exports = writeToCSV;