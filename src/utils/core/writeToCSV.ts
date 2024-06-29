import { parse } from 'json2csv';
import { writeFileSync } from 'fs';
import date from '../helpers/date.js';
import folderName from './folderName.js';

export default async function writeToCSV(timestamps: (number | string)[], source: string, describeTimestampTitle: string) {
    const timestampsWithOrderCheck = timestamps.map((timestamp, index) => {
        let isDescending = '-'
        if (index > 0) {
            isDescending = timestamp <= timestamps[index - 1] ? 'true' : 'false';
        }
        
        return { 
            timestamp, 
            isDescending, 
        };
    });

    const fields = [
        { label: 'Timestamp*', value: 'timestamp' },
        { label: 'Is Descending?', value: 'isDescending' },
        { label: describeTimestampTitle, value: '' } 
    ];

    const csv = parse(timestampsWithOrderCheck, { fields });
    writeFileSync(`src/${folderName}/${source}_${date}.csv`, csv);
}


