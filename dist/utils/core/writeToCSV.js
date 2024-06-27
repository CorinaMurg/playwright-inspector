var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parse } from 'json2csv';
import { writeFileSync } from 'fs';
import date from '../helpers/date.js';
import folderName from './folderName.js';
export default function writeToCSV(timestamps, source, describeTimestampTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestampsWithOrderCheck = timestamps.map((timestamp, index) => {
            let isDescending = '-';
            if (index > 0) {
                isDescending = timestamp <= timestamps[index - 1] ? 'true' : 'false';
            }
            return {
                timestamp,
                isDescending,
                description: `*${describeTimestampTitle}`
            };
        });
        const fields = [
            { label: 'Timestamp', value: 'timestamp' },
            { label: 'Is Descending?', value: 'isDescending' },
            { label: describeTimestampTitle, value: '' }
        ];
        const csv = parse(timestampsWithOrderCheck, { fields });
        writeFileSync(`src/${folderName}/${source}_${date}.csv`, csv);
    });
}
