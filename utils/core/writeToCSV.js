import { parse } from 'json2csv';
import { writeFileSync } from 'fs';
import date from '../helpers/date.js';
import folderName from './folderName.js';

export default async function writeToCSV(timestamps, describeTimestampTitle) {
    const timestampsWithOrderCheck = timestamps.map((timestamp, index) => {
        let isDescending = '-'
        if (index > 0) {
            isDescending = timestamp <= timestamps[index - 1] ? 'true' : 'false';
        }
        return { timestamp, isDescending };
    });

    const csv = parse(timestampsWithOrderCheck);
    writeFileSync(`${folderName}/${date}.csv`, csv);

    // const csvWriter = createCsvWriter({
    //     path: `${folderName}/${date}.csv`,
    //     header: [
    //         { id: 'timestamp', title: `Timestamp*` },
    //         { id: 'isDescending', title: `Is Descending?` },
    //         { id: 'description', title: `*${describeTimestampTitle}` }
    //     ],
    // });

    // await csvWriter.writeRecords(timestampsWithOrderCheck);
}

